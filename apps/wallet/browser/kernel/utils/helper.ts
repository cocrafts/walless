import { Networks, RequestType } from '@walless/core';
import { decryptWithPasscode } from '@walless/crypto';
import type {
	ExtensionDocument,
	PrivateKeyDocument,
	PublicKeyDocument,
} from '@walless/store';
import { storage } from 'utils/storage/db';

import { mockLayoutCards } from './mockExtension';

export const getExtensionById = async (id: string) => {
	return mockLayoutCards.find((card) => card._id === id);
};

export const addExtensionsById = async (id: string) => {
	const extensionDoc = await getExtensionById(id);
	if (!extensionDoc) {
		return;
	}

	await storage.put<ExtensionDocument>(extensionDoc);
};

export const checkInstalledExtensionById = async (id: string) => {
	const extension = await storage.safeGet<ExtensionDocument>(id);

	return extension ? true : false;
};

export const settings = {
	requirePasscode: true,
};

export const getPrivateKey = async (network: Networks, passcode: string) => {
	const result = await storage.find({
		selector: {
			type: 'PublicKey',
			network: network,
		},
	});
	const [publicKey] = result.docs as PublicKeyDocument[];
	const encryptedKey = await storage.safeGet<PrivateKeyDocument>(
		publicKey.privateKeyId,
	);

	return await decryptWithPasscode(passcode, encryptedKey as never);
};

export const getNetwork = (requestType: RequestType) => {
	// TODO: need to resolve usage of requestType
	const typeName = RequestType[requestType as number];
	if (typeName.includes('ON_SOLANA')) return Networks.solana;
	else if (typeName.includes('ON_SUI')) return Networks.sui;
};
