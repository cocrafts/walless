import type { SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { decode } from 'bs58';

export const signMessage = async (
	messageStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey);
	const message = decode(messageStr);
	const signedMessage = await keypair.signPersonalMessage(message);

	return signedMessage;
};

export const signTransaction = async (
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey);
	const transaction = TransactionBlock.from(transactionStr);
	const signedTransaction = await transaction.sign({ signer: keypair });

	return signedTransaction;
};

export const signAndExecuteTransaction = async (
	suiClient: SuiClient,
	transactionStr: string,
	privateKey: Uint8Array,
	requestType: ExecuteTransactionRequestType = 'WaitForLocalExecution',
	options?: SuiTransactionBlockResponseOptions,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey);
	const {
		showEffects = true,
		showEvents = true,
		showBalanceChanges = true,
		showInput = true,
		showObjectChanges = true,
	} = options ?? {};
	const transaction = TransactionBlock.from(transactionStr);
	const executedTransaction = await suiClient.signAndExecuteTransactionBlock({
		transactionBlock: transaction,
		signer: keypair,
		options: {
			showEffects,
			showEvents,
			showBalanceChanges,
			showInput,
			showObjectChanges,
		},
		requestType,
	});

	return executedTransaction;
};

export const constructSendSUITransaction = async (
	receiver: string,
	amount: number,
) => {
	const tx = new TransactionBlock();

	const [coin] = tx.splitCoins({ kind: 'GasCoin' }, [tx.pure(amount)]);

	tx.transferObjects([coin], tx.pure(receiver));
	return tx;
};
