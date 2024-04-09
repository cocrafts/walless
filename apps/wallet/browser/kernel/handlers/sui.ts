import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { ResponseCode } from '@walless/core';
import { sui } from '@walless/network';

import { environment } from '../utils/config';
import { respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

type MessagePayload = {
	privateKey?: Uint8Array;
	message?: string;
};

type TransactionPayload = {
	privateKey?: Uint8Array;
	transaction?: string;
};

export const suiEndpoints = {
	devnet: {
		fullnode: 'https://fullnode.devnet.sui.io',
		faucet: 'https://faucet.devnet.sui.io/gas',
	},
	testnet: {
		fullnode: 'https://fullnode.testnet.sui.io',
		faucet: 'https://faucet.testnet.sui.io/gas',
	},
	mainnet: {
		fullnode: 'https://fullnode.mainnet.sui.io',
		faucet: 'https://faucet.mainnet.sui.io/gas',
	},
};

const suiClient = new SuiClient({
	url:
		environment.NETWORK_CLUSTER === 'mainnet'
			? getFullnodeUrl('mainnet')
			: getFullnodeUrl('devnet'),
});

export const signMessage: HandleMethod<MessagePayload> = async ({
	payload,
}) => {
	if (!payload.privateKey || !payload.message) {
		throw Error('Missing privateKey or message');
	}

	const { requestId, message, privateKey } = payload;
	const signedMessage = await sui.signMessage(message, privateKey);
	respond(requestId, ResponseCode.SUCCESS, { signedMessage });
};

export const signTransaction: HandleMethod<TransactionPayload> = async ({
	payload,
}) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const { requestId, transaction, privateKey } = payload;
	const signedTransaction = await sui.signTransaction(transaction, privateKey);
	respond(requestId, ResponseCode.SUCCESS, { signedTransaction });
};

export const signAndExecuteTransaction: HandleMethod<
	TransactionPayload
> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const { requestId, transaction, privateKey } = payload;
	const signedTransaction = await sui.signAndExecuteTransaction(
		suiClient,
		transaction,
		privateKey,
	);
	respond(requestId, ResponseCode.SUCCESS, { signedTransaction });
};
