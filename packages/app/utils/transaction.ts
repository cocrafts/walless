import { aptosHandlers } from '@walless/kernel';
import { TransactionBlock } from '@mysten/sui.js';
import {
	ACCOUNT_SIZE,
	createAssociatedTokenAccountInstruction,
	createTransferInstruction,
	getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import type { Connection } from '@solana/web3.js';
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	TransactionMessage,
	VersionedTransaction,
} from '@solana/web3.js';
import type {
	Collectible,
	TezosTransaction,
	Token,
	TransactionPayload,
} from '@walless/core';
import { Networks } from '@walless/core';
import { getAptosConnection } from '@walless/engine/crawlers/aptos';
import { modules } from '@walless/ioc';
import { TxnBuilderTypes } from 'aptos';

export const checkValidAddress = (keyStr: string, network: Networks) => {
	try {
		if (network == Networks.solana) {
			new PublicKey(keyStr);
			return { valid: true, message: '' };
		} else if (network == Networks.sui) {
			return { valid: true, message: '' };
		} else if (network == Networks.tezos) {
			return { valid: true, message: '' };
		} else if (network == Networks.aptos) {
			const { AccountAddress } = TxnBuilderTypes;
			return { valid: AccountAddress.isValid(keyStr), message: '' };
		}
		return { valid: false, message: 'Unsupported network ' + network };
	} catch (error) {
		return { valid: false, message: (error as Error).message };
	}
};

export const getTransactionFee = async (payload: TransactionPayload) => {
	if (payload.network == Networks.solana) {
		const transaction = await constructTransaction(payload);
		const connection = modules.engine.getConnection(
			Networks.solana,
		) as Connection;
		const message = (transaction as VersionedTransaction).message;
		const transactionFeePromise = connection
			.getFeeForMessage(message)
			.then((res) => res.value || 0);

		const rentFeePromise = (async () => {
			if (payload.token.metadata?.symbol == 'SOL') return 0;
			const receiverATAddress = getAssociatedTokenAddressSync(
				new PublicKey(payload.token.account.mint as string),
				new PublicKey(payload.receiver),
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

		return (txFee + rentFee || 0) / LAMPORTS_PER_SOL;
	} else if (payload.network == Networks.sui) {
		return 0;
	} else if (payload.network == Networks.aptos) {
		const connection = await getAptosConnection();
		const fee = await connection.estimateGasPrice();
		return fee.gas_estimate / 10 ** 8;
	} else return 0;
};

type SendTokenProps = {
	sender: string;
	token: Token | Collectible;
	network: Networks;
	receiver: string;
	amount: number;
};

export const constructTransaction = async ({
	sender,
	token,
	network,
	receiver,
	amount,
}: SendTokenProps) => {
	const decimals = (token as Token).account?.decimals
		? 10 ** ((token as Token).account.decimals || 0)
		: 1;
	const isCollectible = 'collectionId' in token;

	if (network == Networks.solana) {
		const connection = modules.engine.getConnection(network) as Connection;
		if (token.metadata?.symbol == 'SOL') {
			return await constructSendSOLTransaction(
				connection,
				new PublicKey(sender),
				new PublicKey(receiver),
				amount * decimals,
			);
		} else if (token.network == Networks.solana) {
			return await constructSendSPLTokenTransactionInSol(
				connection,
				new PublicKey(sender),
				new PublicKey(receiver),
				amount * decimals,
				token as Token,
			);
		}
	} else if (network == Networks.sui) {
		if (token.metadata?.symbol == 'SUI') {
			return await constructSendSUITransaction(receiver, amount * decimals);
		}
	} else if (network == Networks.tezos) {
		if (token.metadata?.symbol == 'TEZ') {
			return constructSendTezTransaction(receiver, amount);
		}
	} else if (network == Networks.aptos) {
		if (isCollectible) {
			return {
				from: sender,
				to: receiver,
				creator: (token as Collectible).metadata.aptosToken?.creatorAddress,
				collectionName: (token as Collectible).metadata.aptosToken
					?.collectionName,
				tokenName: (token as Collectible).metadata.name,
				amount: amount,
			} as aptosHandlers.AptosTokenPayload;
		} else {
			return {
				from: sender,
				to: receiver,
				token: (token as Token).account.address,
				amount: amount,
				decimals: (token as Token).account?.decimals,
			} as aptosHandlers.AptosCoinPayload;
		}
	}

	throw Error('Network or Token is not supported');
};

const constructSendSOLTransaction = async (
	connection: Connection,
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
) => {
	const instructions = [
		SystemProgram.transfer({
			fromPubkey: sender,
			toPubkey: receiver,
			lamports: amount,
		}),
	];

	const blockhash = (await connection.getLatestBlockhash('finalized'))
		.blockhash;

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions,
	}).compileToV0Message();

	return new VersionedTransaction(message);
};

const constructSendSPLTokenTransactionInSol = async (
	connection: Connection,
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
	token: Token | Collectible,
) => {
	const mintAddress = new PublicKey(token.account.mint as string);
	const senderATAddress = getAssociatedTokenAddressSync(mintAddress, sender);
	const ReceiverATAddress = getAssociatedTokenAddressSync(
		mintAddress,
		receiver,
	);
	const receiverATA = await connection.getAccountInfo(ReceiverATAddress);

	const instructions = [];
	if (!receiverATA) {
		const createATAInstruction = createAssociatedTokenAccountInstruction(
			sender,
			ReceiverATAddress,
			receiver,
			mintAddress,
		);
		instructions.push(createATAInstruction);
	}

	const transferInstruction = createTransferInstruction(
		senderATAddress,
		ReceiverATAddress,
		sender,
		amount,
	);
	instructions.push(transferInstruction);

	const blockhash = (await connection.getLatestBlockhash('finalized'))
		.blockhash;

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions: instructions,
	}).compileToV0Message();

	return new VersionedTransaction(message);
};

const constructSendSUITransaction = async (
	receiver: string,
	amount: number,
) => {
	const tx = new TransactionBlock();

	const [coin] = tx.splitCoins({ kind: 'GasCoin' }, [tx.pure(amount)]);

	tx.transferObjects([coin], tx.pure(receiver));
	return tx;
};

const constructSendTezTransaction = (
	receiver: string,
	amount: number,
): TezosTransaction => {
	return {
		type: 'native',
		receiver,
		amount,
	};
};
