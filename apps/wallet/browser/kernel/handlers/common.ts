import type { ChromeKernel } from '@metacraft/crab/chrome';
import type { Middleware } from '@metacraft/crab/core';
import { PublicKey } from '@solana/web3.js';
import type { RequestType, SuiPublicKey } from '@walless/core';
import { Networks } from '@walless/core';
import { ResponseCode } from '@walless/core';
import type { Channels } from '@walless/messaging';
import type { PublicKeyDocument, TrustedDomainDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { encode } from 'bs58';
import { storage } from 'utils/storage/db';

import {
	addExtensionsById,
	checkInstalledExtensionById,
} from '../utils/helper';
import { openPopup } from '../utils/popup';
import { respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

export const connect: Middleware = async (payload, respond) => {
	if (!payload.options) throw new Error('No connection options provided');

	const connectOptions = payload.options;
	if (connectOptions.domain) {
		const doc = {
			_id: connectOptions.domain,
			type: 'TrustedDomain',
			trusted: true,
			connectCount: 1,
			connect: true,
		};
		await storage.upsert<TrustedDomainDocument>(doc._id, async (prevDoc) => {
			if (prevDoc.connectCount) {
				doc.connectCount = prevDoc.connectCount + 1;
			}

			return doc as TrustedDomainDocument;
		});
	}

	const pkDocs = await storage.find<PublicKeyDocument>(selectors.allKeys);
	const publicKeys = pkDocs.docs
		.map((publickey) => {
			switch (publickey.network) {
				case Networks.solana: {
					const { _id, network } = publickey;
					return {
						publicKey: encode(new PublicKey(_id).toBytes()),
						network,
					};
				}

				case Networks.sui: {
					const { network, encodedPublicKey } =
						publickey as never as SuiPublicKey;
					return {
						publicKey: encodedPublicKey,
						network,
					};
				}
			}
		})
		.filter((k) => !!k);

	respond({
		publicKeys,
		requestId: payload.id,
		responseCode: ResponseCode.SUCCESS,
	});
};

export const disconnect: Middleware = async (payload, respond) => {
	if (!payload.options) throw Error('No disconnection options provided');

	const connectOptions = payload.options;
	if (connectOptions.domain) {
		await storage.upsert<TrustedDomainDocument>(
			connectOptions.domain,
			async (doc) => {
				doc.connect = false;
				return doc as TrustedDomainDocument;
			},
		);
	}

	respond({
		...payload,
		responseCode: ResponseCode.SUCCESS,
	});
};

export const requestPayload = (
	kernel: ChromeKernel<Channels, RequestType>,
): Middleware => {
	return async (payload, respond) => {
		if (!payload.resolveId) {
			throw Error('Not sourceRequestId provided');
		}

		const { resolveId, id: requestId } = payload;
		const response = kernel.getRequestByResolveId(resolveId);

		if ('error' in response) {
			respond({ error: response.error });
		} else {
			respond({
				requestId,
				responseCode: ResponseCode.SUCCESS,
				...response.request,
			});
		}
	};
};

export type LayoutPayload = {
	id?: string;
};

export const installLayout: HandleMethod<LayoutPayload> = async ({
	payload,
}) => {
	const { requestId, id } = payload;
	if (!id) throw Error('No layout id provided');

	await addExtensionsById(id);
	respond(requestId, ResponseCode.SUCCESS);
};

export const checkInstalledLayout: HandleMethod<LayoutPayload> = async ({
	payload,
}) => {
	const { requestId, id } = payload;
	if (!id) throw Error('No layout id provided');

	const isInstalled = await checkInstalledExtensionById(id);
	if (!isInstalled) throw Error('Layout not installed');

	respond(requestId, ResponseCode.SUCCESS);
};

export const openLayoutPopup: HandleMethod<LayoutPayload> = async ({
	payload,
}) => {
	const { requestId, id: layoutId } = payload;
	if (!layoutId) throw Error('No layout id provided');

	const popup = await openPopup(layoutId, requestId);
	if (!popup) throw Error('Cannot open popup');

	respond(requestId, ResponseCode.SUCCESS);
};
