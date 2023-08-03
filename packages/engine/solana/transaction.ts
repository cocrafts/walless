import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type {
	ConfirmedSignatureInfo,
	Connection,
	ParsedTransactionWithMeta,
} from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { Collectible, Token } from '@walless/core';
import { Networks } from '@walless/core';

import { modules } from '../../ioc';
import { historyActions } from '../state/history';

import { getSolanaMetadata } from './metadata';

export interface Transaction {
	signature: string;
	network: Networks;
	type: 'sent' | 'received';
	status: 'success' | 'pending' | 'failed';
	sender: string;
	receiver: string;
	token: Omit<Token, 'account'> | Omit<Collectible, 'account' | 'collectionId'>;
	fee: number;
	preBalance?: number;
	postBalance?: number;
	amount: number;
	date: Date;
}

const getConfirmation = async (connection: Connection, signature: string) => {
	const result = await connection.getSignatureStatus(signature, {
		searchTransactionHistory: true,
	});
	return result.value?.confirmationStatus;
};

export const getTransactionDetails = async (
	connection: Connection,
	parsedTransaction: ParsedTransactionWithMeta,
	ownerPublicKey: string,
) => {
	if (!parsedTransaction.meta) return;

	const confirmation = await getConfirmation(
		connection,
		parsedTransaction.transaction.signatures[0],
	);

	const status =
		confirmation === 'finalized'
			? 'success'
			: confirmation === 'processed'
			? 'pending'
			: 'failed';

	const finalTransaction: Transaction = {
		signature: parsedTransaction.transaction.signatures[0],
		network: Networks.solana,
		type: 'sent',
		status: status,
		sender: '',
		receiver: '',
		token: {
			network: Networks.solana,
		},
		fee: parsedTransaction.meta.fee / 10 ** 9,
		preBalance: 0,
		postBalance: 0,
		amount: 0,
		date: new Date(parsedTransaction.blockTime! * 1000),
	};

	if (
		!parsedTransaction.meta.preTokenBalances ||
		!parsedTransaction.meta.postTokenBalances ||
		parsedTransaction.meta.postTokenBalances.length === 0 ||
		parsedTransaction.meta.preTokenBalances.length === 0
	) {
		const solMetadata = await getSolanaMetadata({
			storage: modules.storage,
			connection: connection,
			mintAddress: '11111111111111111111111111111111',
		});
		finalTransaction.token.metadata = solMetadata;

		finalTransaction.sender =
			parsedTransaction.transaction.message.accountKeys[0].pubkey.toString();
		finalTransaction.receiver =
			parsedTransaction.transaction.message.accountKeys[1].pubkey.toString();

		finalTransaction.type =
			ownerPublicKey === finalTransaction.sender ? 'sent' : 'received';

		finalTransaction.preBalance =
			parsedTransaction.meta.preBalances[
				finalTransaction.type === 'sent' ? 0 : 1
			] /
			10 ** 9;
		finalTransaction.postBalance =
			parsedTransaction.meta.postBalances[
				finalTransaction.type === 'sent' ? 0 : 1
			] /
			10 ** 9;

		finalTransaction.amount = parseFloat(
			Math.abs(
				finalTransaction.postBalance -
					finalTransaction.preBalance +
					finalTransaction.fee,
			).toPrecision(3),
		);
	} else {
		const tokenAccount = await getSolanaMetadata({
			storage: modules.storage,
			connection,
			mintAddress: parsedTransaction.meta.postTokenBalances[0].mint,
		});

		finalTransaction.token.metadata = tokenAccount;

		if (!parsedTransaction.meta.preTokenBalances[0].uiTokenAmount.uiAmount)
			finalTransaction.preBalance = 0;
		else
			finalTransaction.preBalance =
				parsedTransaction.meta.preTokenBalances[0].uiTokenAmount.uiAmount;

		if (!parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.uiAmount)
			finalTransaction.postBalance = 0;
		else
			finalTransaction.postBalance =
				parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.uiAmount;

		finalTransaction.amount = Math.abs(
			finalTransaction.postBalance - finalTransaction.preBalance,
		);

		finalTransaction.type =
			finalTransaction.postBalance - finalTransaction.preBalance < 0
				? 'sent'
				: 'received';

		if (!parsedTransaction.meta.postTokenBalances[1])
			console.log(finalTransaction.signature);

		if (finalTransaction.type === 'sent') {
			finalTransaction.sender = ownerPublicKey;
			finalTransaction.receiver =
				parsedTransaction.meta.postTokenBalances[1].owner ?? '';
		} else {
			finalTransaction.sender =
				parsedTransaction.meta.postTokenBalances[1].owner ?? '';
			finalTransaction.receiver = ownerPublicKey;
		}
	}

	return finalTransaction;
};

export const getSignatureList = async (
	connection: Connection,
	ownerPublicKey: string,
) => {
	const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
		filters: [
			{
				dataSize: 165,
			},
			{
				memcmp: {
					offset: 32,
					bytes: ownerPublicKey,
				},
			},
		],
	});

	const tokenAccounts = [ownerPublicKey];
	accounts.map((account) => {
		tokenAccounts.push(account.pubkey.toString());
	});

	let confirmedSignatureInfos: ConfirmedSignatureInfo[] = [];
	for (let i = 0; i < tokenAccounts.length; i++) {
		const signatureInfos = await connection.getSignaturesForAddress(
			new PublicKey(tokenAccounts[i]),
			{ limit: 30 },
		);
		confirmedSignatureInfos = Array.from(
			new Set(confirmedSignatureInfos.concat(signatureInfos)),
		);
	}

	const signatures = Array.from(
		new Set(confirmedSignatureInfos.map((info) => info.signature)),
	);

	return signatures;
};

export const getTransactions = async (
	connection: Connection,
	signatures: string[],
	ownerPublicKey: string,
) => {
	const parsedTransactions = await connection.getParsedTransactions(
		signatures,
		{ maxSupportedTransactionVersion: 0 },
	);

	const promisesArray = parsedTransactions
		.sort((a, b) => b!.blockTime! - a!.blockTime!)
		.slice(0, 20)
		.map(async (transaction, i) => {
			console.log(`transaction ${i}: `, transaction);
			if (!transaction || !transaction.blockTime) return null;

			const transactionDetails = await getTransactionDetails(
				connection,
				transaction,
				ownerPublicKey,
			);
			if (!transactionDetails) return null;

			return transactionDetails;
		});

	let transactions = await Promise.all(promisesArray);

	transactions = transactions.filter((transaction) => {
		return transaction !== null;
	});
	historyActions.setItems(transactions);

	return transactions;
};
