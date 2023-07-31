import type {
	Connection,
	ParsedInstruction,
	PartiallyDecodedInstruction,
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
	amount: number;
	date: Date;
}

export const getTokenAccountFromAta = async (
	ata: string,
	connection: Connection,
) => {
	const ataAddress = new PublicKey(ata);
	const accountInfo = await connection.getParsedAccountInfo(ataAddress);

	if (
		accountInfo.value &&
		'parsed' in accountInfo.value.data &&
		accountInfo.value.data.parsed.info
	) {
		return accountInfo.value.data.parsed.info;
	}
};

const isParsedInstruction = (
	instruction: ParsedInstruction | PartiallyDecodedInstruction | undefined,
): instruction is ParsedInstruction => true;

export const getTransactionDetails = async (
	instruction: ParsedInstruction,
	connection: Connection,
	ownerPublicKey: string,
	signature: string,
	blockTime: number,
) => {
	let transaction: Transaction;
	const date = new Date(blockTime * 1000);

	switch (instruction.program) {
		case 'system' || null: {
			const solMetadata = await getSolanaMetadata({
				storage: modules.storage,
				connection: connection,
				mintAddress: '11111111111111111111111111111111',
			});
			const token: Omit<Token, 'account'> = {
				network: Networks.solana,
				metadata: solMetadata,
			};

			const type =
				ownerPublicKey === instruction.parsed.info.source ? 'sent' : 'received';

			transaction = {
				signature: signature,
				network: Networks.solana,
				type: type,
				status: 'success',
				sender: instruction.parsed.info.source,
				receiver: instruction.parsed.info.destination,
				token: token,
				amount: instruction.parsed.info.lamports / 10 ** 9,
				date: date,
			};
			return transaction;
		}

		case 'spl-token' || 'spl-associated-token-account': {
			const tokenAccount = await getTokenAccountFromAta(
				instruction.parsed.info.destination,
				connection,
			);
			if (!tokenAccount) break;
			console.log('tokenAccount: ', tokenAccount);

			const tokenMetadata = await getSolanaMetadata({
				storage: modules.storage,
				connection: connection,
				mintAddress: tokenAccount.mint,
			});

			console.log(tokenMetadata);

			const token:
				| Omit<Token, 'account'>
				| Omit<Collectible, 'account' | 'collectionId'> = {
				network: Networks.solana,
				metadata: tokenMetadata,
			};

			const type =
				ownerPublicKey === instruction.parsed.info.authority
					? 'sent'
					: 'received';

			transaction = {
				signature: signature,
				network: Networks.solana,
				type: type,
				status: 'success',
				sender: instruction.parsed.info.authority,
				receiver: tokenAccount.owner,
				token: token,
				amount:
					instruction.parsed.info.amount /
					10 ** tokenAccount.tokenAmount.decimals,
				date: date,
			};
			return transaction;
		}
	}
};

export const getTransactions = async (
	connection: Connection,
	ownerPublicKey: string,
) => {
	const confirmedSignatureInfos = await connection.getSignaturesForAddress(
		new PublicKey(ownerPublicKey),
		{ limit: 20 },
	);
	const signatures = confirmedSignatureInfos.map((info) => info.signature);

	const parsedTransactions = await connection.getParsedTransactions(
		signatures,
		{ maxSupportedTransactionVersion: 0 },
	);

	const promisesArray = parsedTransactions.map(async (transaction, i) => {
		if (!transaction || !transaction.blockTime) return null;

		const instruction = transaction.transaction.message.instructions.pop();
		if (!isParsedInstruction(instruction)) return null;
		console.log(`instruction ${i}: `, instruction);

		const transactionDetails = await getTransactionDetails(
			instruction,
			connection,
			ownerPublicKey,
			signatures[i],
			transaction.blockTime,
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
