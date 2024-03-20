import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { ResponseCode } from '@walless/core';
import { tezos } from '@walless/network';
import { encode } from 'bs58';
import { environment } from 'utils/config';

import { respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

export const tezosEndpoints: Record<string, string> = {
	tezosMainnet: 'https://uoi3x99n7c.tezosrpc.midl.dev',
	smartpyMainnet: 'https://mainnet.smartpy.io',
	tezieMainnet: 'https://mainnet.api.tez.ie',
	ghostnetTestnet: 'https://uoi3x99n7c.ghostnet.tezosrpc.midl.dev',
	mumbainetTestnet: 'https://rpc.mumbainet.teztnets.xyz/',
};

const tezosToolkit = new TezosToolkit(
	environment.NETWORK_CLUSTER === 'mainnet'
		? tezosEndpoints.tezosMainnet
		: tezosEndpoints.ghostnetTestnet,
);

export const signPayload: HandleMethod<{
	privateKey?: Uint8Array;
	payload?: string;
}> = async ({ payload }) => {
	if (!payload.privateKey || !payload.payload) {
		throw Error('Missing privateKey or message');
	}

	const privateKey = encode(payload.privateKey);
	const signer = await InMemorySigner.fromSecretKey(privateKey);
	const { prefixSig } = await signer.sign(payload.payload as string);

	respond(payload.requestId, ResponseCode.SUCCESS, { signature: prefixSig });
};

export const transferToken: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
}> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const hash = await tezos.transferToken(
		tezosToolkit,
		payload.transaction,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { hash });
};
