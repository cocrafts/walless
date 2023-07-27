import type {
	Connection,
	ParsedInstruction,
	PartiallyDecodedInstruction,
} from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { Collectible, Token } from '@walless/core';
import { Networks } from '@walless/core';

import { modules } from '../../ioc';

import { getSolanaMetadata } from './metadata';

export interface Transaction {
	signature: string;
	sender: string;
	receiver: string;
	token: Omit<Token, 'account'> | Omit<Collectible, 'account'>;
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

export const isParsedInstruction = (
	instruction: ParsedInstruction | PartiallyDecodedInstruction | undefined,
): instruction is ParsedInstruction => true;

export const getTransactionDetails = async (
	instruction: ParsedInstruction,
	connection: Connection,
) => {
	let transaction: Transaction;

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

			transaction = {
				signature: '',
				sender: instruction.parsed.info.source,
				receiver: instruction.parsed.info.destination,
				token: token,
				amount: instruction.parsed.info.lamports / 10 ** 9,
				date: new Date(),
			};
			return transaction;
		}

		case 'spl-token' || 'spl-associated-token-account': {
			const tokenAccount = await getTokenAccountFromAta(
				instruction.parsed.info.destination,
				connection,
			);

			if (!tokenAccount) {
				break;
			}
			const tokenMetadata = await getSolanaMetadata({
				storage: modules.storage,
				connection: connection,
				mintAddress: tokenAccount.mint,
			});

			const token: Omit<Token, 'account'> = {
				network: Networks.solana,
				metadata: tokenMetadata,
			};

			transaction = {
				signature: '',
				sender: instruction.parsed.info.authority,
				receiver: tokenAccount.owner,
				token: token,
				amount:
					instruction.parsed.info.amount / tokenAccount.tokenAmount.decimals,
				date: new Date(),
			};
			return transaction;
		}
	}
};

export const getTransactions = async (
	connection: Connection,
	ownerPublicKey: string,
) => {
	const transactions: Transaction[] = [];
	const transactionList = await connection
		.getSignaturesForAddress(new PublicKey(ownerPublicKey))
		.then((result) => {
			return result;
		});
	const signatureList = transactionList.map(
		(transaction) => transaction.signature,
	);
	const transactionDetails = await connection.getParsedTransactions(
		signatureList,
		{ maxSupportedTransactionVersion: 0 },
	);

	transactionDetails.forEach(async (transaction, i) => {
		if (
			transaction !== null &&
			transaction.blockTime !== null &&
			transaction.blockTime !== undefined
		) {
			const date = new Date(transaction.blockTime * 1000);
			const instruction = transaction.transaction.message.instructions.pop();

			console.log(`instruction ${i}: `, instruction);
			if (isParsedInstruction(instruction)) {
				const transactionDetails = await getTransactionDetails(
					instruction,
					connection,
				);
				if (transactionDetails) {
					transactionDetails.signature = signatureList[i];
					transactionDetails.date = date;
					transactions.push(transactionDetails);
				}
			}
		}
	});

	console.log('transactions: ', transactions);

	return transactions;
};
