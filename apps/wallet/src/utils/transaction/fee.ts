import { ACCOUNT_SIZE, getAssociatedTokenAddressSync } from '@solana/spl-token';
import type { VersionedTransaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { SolanaCollectible, SolanaToken } from '@walless/core';
import { logger, Networks } from '@walless/core';
import { solana } from '@walless/network';
import type { NftDocumentV2, TokenDocumentV2 } from '@walless/store';
import base58 from 'bs58';
import { getDefaultEngine } from 'engine';
import type { SolanaContext } from 'engine/runners';
import { environment } from 'utils/config';
import { solMint } from 'utils/constants';

import {
	constructSolanaSendNftTransaction,
	constructSolanaSendTokenTransaction,
} from './construct';
import { getGasilonConfig } from './gasilon';
import type {
	SendNftTransaction,
	SendTokenTransaction,
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
} from './types';

export const hasEnoughBalanceToMakeTx = async (
	initTransaction:
		| SendTokenTransaction
		| SendNftTransaction
		| SolanaSendTokenTransaction
		| SolanaSendNftTransaction,
) => {
	const { network } = initTransaction;

	switch (network) {
		case Networks.solana: {
			const solanaTransaction = initTransaction as SolanaSendTokenTransaction &
				SolanaSendNftTransaction;
			const { sender, receiver, tokenForFee, type, token, nft } =
				solanaTransaction;

			if (tokenForFee && tokenForFee.mint !== solMint) {
				const { fee } = await getGasilonFee({
					sender,
					receiver,
					mint: type === 'token' ? token.mint : nft.mint,
					feeMint: solMint,
				});
				if (tokenForFee.balance < fee) return false;

				if (type === 'token') {
					const { token, amount } =
						initTransaction as SolanaSendTokenTransaction;
					if (token.mint === tokenForFee?.mint) {
						return token.balance + tokenForFee.balance > amount;
					}
					return token.balance > amount;
				}
			} else if (tokenForFee && tokenForFee.mint === solMint) {
				const { fee } = await getSolanaTransactionFee(solanaTransaction);
				return tokenForFee.balance > fee;
			}
			break;
		}
		default: {
			return false;
		}
	}
};

export type GetSolanaFeeConfig = {
	type: 'token' | 'nft';
	sender: string;
	receiver: string;
	nft?: NftDocumentV2<SolanaCollectible>;
	token?: TokenDocumentV2<SolanaToken>;
	tokenForFee: TokenDocumentV2<SolanaToken>;
};

export type SolanaFeeResult = {
	fee: number;
	mint: string;
};

export const getSolanaTransactionFee = async (
	initTransaction: GetSolanaFeeConfig,
): Promise<SolanaFeeResult> => {
	const { type, sender, receiver, token, nft, tokenForFee } = initTransaction;

	let transaction;
	if (type === 'token') {
		if (!token) throw Error("require token when type is 'token'");
		transaction = await constructSolanaSendTokenTransaction({
			sender,
			receiver,
			token,
			tokenForFee,
			fee: 0,
			amount: 0,
		});
	} else {
		if (!nft) throw Error("require nft when type is 'nft'");
		transaction = await constructSolanaSendNftTransaction({
			sender,
			receiver,
			nft,
			tokenForFee,
			fee: 0,
			amount: 0,
		});
	}

	if (!transaction) return { fee: 0, mint: tokenForFee.mint };

	const engine = getDefaultEngine();
	const { connection } = engine.getContext<SolanaContext>(Networks.solana);

	const message = (transaction as VersionedTransaction).message;
	const transactionFeePromise = connection
		.getFeeForMessage(message)
		.then((res) => res.value || 0);

	const rentFeePromise = (async () => {
		const { receiver } = initTransaction;
		let mint;
		if (initTransaction.type === 'token') {
			const { token } = initTransaction as SolanaSendTokenTransaction;
			if (token.mint === solMint) return 0;
			mint = token.mint;
		} else {
			const { nft } = initTransaction as SolanaSendNftTransaction;
			mint = nft.mint;
		}

		const receiverATAddress = getAssociatedTokenAddressSync(
			new PublicKey(mint),
			new PublicKey(receiver),
		);

		const receiverATAccount =
			await connection.getAccountInfo(receiverATAddress);

		if (!receiverATAccount) {
			return await connection.getMinimumBalanceForRentExemption(ACCOUNT_SIZE);
		}

		return 0;
	})();

	const [txFee, rentFee] = await Promise.all([
		transactionFeePromise,
		rentFeePromise,
	]);

	return { fee: txFee + rentFee, mint: tokenForFee.mint };
};

export type GetGasilonFeeConfig = {
	sender: string;
	receiver: string;
	mint: string;
	feeMint: string;
};

export const getGasilonFee = async ({
	sender,
	receiver,
	mint,
	feeMint,
}: GetGasilonFeeConfig): Promise<SolanaFeeResult> => {
	const config = await getGasilonConfig();
	if (!config) return { fee: 0, mint };

	const engine = getDefaultEngine();
	const { connection } = engine.getContext<SolanaContext>(Networks.solana);
	const transaction = await solana.constructGasilonTransaction(connection, {
		sender: new PublicKey(sender),
		receiver: new PublicKey(receiver),
		feePayer: new PublicKey(config.feePayer),
		amount: 0, // mock amount for get gee
		fee: 0, // mock amount for get gee
		mint: new PublicKey(mint),
		feeMint: new PublicKey(feeMint),
	});

	try {
		const res = await fetch(`${environment.GASILON_ENDPOINT}/solana/getFee`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				transaction: base58.encode(transaction.serialize()),
			}),
		});

		const data = await res.json();

		return { fee: data.totalByFeeToken, mint };
	} catch (error) {
		logger.error('Failed to get gasilon transaction fee', error);
		return { fee: 0, mint };
	}
};
