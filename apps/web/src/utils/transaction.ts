import { Ed25519Keypair, TransactionBlock } from '@mysten/sui.js';
import {
	createAssociatedTokenAccountInstruction,
	createTransferInstruction,
	getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import {
	clusterApiUrl,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
	TransactionMessage,
	VersionedMessage,
	VersionedTransaction,
} from '@solana/web3.js';
import type {
	Collectible,
	TezosTransaction,
	Token,
	TransactionPayload,
} from '@walless/core';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { ResponsePayload } from '@walless/messaging';
import { RequestType } from '@walless/messaging';
import axios from 'axios';
import { requestHandleTransaction } from 'bridge/listeners';
import { encode } from 'bs58';

const sampleKeypair = Keypair.generate();
const suiSampleKeypair = Ed25519Keypair.generate();

const connection = new Connection(clusterApiUrl('devnet'));

let solConn: Connection | undefined;
export const getSolanaConnection = async () => {
	if (solConn) return solConn;
	else {
		const endpoint = (
			await requestHandleTransaction({
				type: RequestType.GET_ENDPOINT_ON_SOLANA,
			})
		).endpoint;

		console.log(`Init solana connection, endpoint: ${endpoint}`);

		solConn = new Connection(endpoint);
		return solConn;
	}
};

// These methods must be implemented by sync connection
export const getLatestBlockhashOnSolana = async () => {
	const conn = await getSolanaConnection();
	return await conn.getLatestBlockhash().then((res) => res.blockhash);
};

export const getFeeForMessageOnSolana = async (message: VersionedMessage) => {
	const conn = await getSolanaConnection();
	return (await conn.getFeeForMessage(message)).value || 0;
};

export const getParsedTransactionOnSolana = async (signature: string) => {
	const conn = await getSolanaConnection();
	return await conn.getParsedTransaction(signature, {
		maxSupportedTransactionVersion: 0,
	});
};

export const getTransactionResult = async (
	signature: string,
	network: Networks,
) => {
	let time;
	if (network == Networks.solana) {
		const parsedTransaction = await getParsedTransactionOnSolana(signature);
		const blockTime = parsedTransaction?.blockTime;

		if (blockTime) time = new Date(blockTime);
	}

	return {
		time,
	};
};

// ---------------------------------------------------------

export const createAndSend = async (
	payload: TransactionPayload,
	passcode?: string,
) => {
	const transaction =
		payload.token.metadata?.symbol === 'SOL'
			? await constructTransaction(payload)
			: await constructTransactionAbstractFee(payload);

	let res;

	if (transaction instanceof VersionedTransaction) {
		res =
			payload.token.metadata?.symbol === 'SOL'
				? await requestHandleTransaction({
						type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
						transaction: encode(transaction.serialize()),
						passcode,
				  })
				: await requestHandleTransaction({
						type: RequestType.SIGN_TRANSACTION_ABSTRACTION_FEE_ON_SOLANA,
						transaction: encode(transaction.serialize()),
						passcode,
				  });
	} else if (transaction instanceof TransactionBlock) {
		res = await requestHandleTransaction({
			type: RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI,
			transaction: transaction.serialize(),
			passcode,
		});
	} else if (payload.network == Networks.tezos) {
		res = await requestHandleTransaction({
			type: RequestType.TRANSFER_TEZOS_TOKEN,
			transaction: JSON.stringify(transaction),
			passcode,
		});
	}

	return res as ResponsePayload;
};

export const getWalletPublicKey = async (network: Networks) => {
	return (
		await modules.storage.find({
			selector: { network: network },
		})
	).docs[0]._id;
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
	console.log('constructTransaction');
	const decimals = (token as Token).account?.decimals
		? 10 ** ((token as Token).account.decimals || 0)
		: 1;

	if (network == Networks.solana) {
		if (token.metadata?.symbol == 'SOL') {
			return await constructSendSOLTransaction(
				new PublicKey(sender),
				new PublicKey(receiver),
				amount * decimals,
			);
		} else if (token.network == Networks.solana) {
			return await constructSendSPLTokenTransactionInSol(
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
	}

	throw Error('Network or Token is not supported');
};

export const constructTransactionAbstractFee = async ({
	sender,
	token,
	receiver,
	amount,
}: SendTokenProps) => {
	const bh = await connection.getLatestBlockhash();

	const blockhash = bh.blockhash;

	const lastValidBlockHeight = bh.lastValidBlockHeight;
	const transaction = new Transaction({
		blockhash,
		lastValidBlockHeight,
	});

	const mintAddress = new PublicKey(token.account.mint as string);
	const decimals = (token as Token).account?.decimals;

	const senderPublicKey = new PublicKey(sender);
	const senderAta = getAssociatedTokenAddressSync(mintAddress, senderPublicKey);

	const receiverPublicKey = new PublicKey(receiver);
	const receiverAta = getAssociatedTokenAddressSync(
		mintAddress,
		receiverPublicKey,
	);

	const octaneConfig = (
		await axios.get(
			'https://h54f2ajwqf.execute-api.ap-south-1.amazonaws.com/api/gasilon/',
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			},
		)
	).data;

	const feePayerPublicKey = new PublicKey(octaneConfig.feePayer);
	const feePayerAta = getAssociatedTokenAddressSync(
		mintAddress,
		feePayerPublicKey,
	);

	const instructions = [];

	instructions.push(
		createTransferInstruction(
			senderAta,
			feePayerAta,
			senderPublicKey,
			0.01 * 10 ** decimals, // hard code required 0.01 Token as gas fee (decimals is 9)
		),
	);

	if (!receiverAta) {
		instructions.push(
			createAssociatedTokenAccountInstruction(
				senderPublicKey,
				receiverAta,
				receiverPublicKey,
				mintAddress,
			),
		);
	}

	instructions.push(
		createTransferInstruction(
			senderAta,
			receiverAta,
			senderPublicKey,
			amount * 10 ** decimals,
		),
	);

	transaction.feePayer = feePayerPublicKey;
	transaction.add(...instructions);

	const finalTransaction = new VersionedTransaction(
		VersionedMessage.deserialize(transaction.serializeMessage()),
	);

	return finalTransaction;
};

export const checkValidAddress = (keyStr: string, network: Networks) => {
	try {
		if (network == Networks.solana) {
			new PublicKey(keyStr);
			return { valid: true, message: '' };
		} else if (network == Networks.sui) {
			return { valid: true, message: '' };
		} else if (network == Networks.tezos) {
			return { valid: true, message: '' };
		}
		return { valid: false, message: 'Unsupported network ' + network };
	} catch (error) {
		return { valid: false, message: (error as Error).message };
	}
};

export const getTransactionFee = async (network: Networks) => {
	if (network == Networks.solana) {
		const instructions = [
			SystemProgram.transfer({
				fromPubkey: sampleKeypair.publicKey,
				toPubkey: sampleKeypair.publicKey,
				lamports: LAMPORTS_PER_SOL / 10,
			}),
		];

		const message = new TransactionMessage({
			payerKey: sampleKeypair.publicKey,
			recentBlockhash: await getLatestBlockhashOnSolana(),
			instructions,
		}).compileToV0Message();

		return ((await getFeeForMessageOnSolana(message)) || 0) / LAMPORTS_PER_SOL;
	} else if (network == Networks.sui) {
		const tx = new TransactionBlock();

		const amount = 0.1;

		const [coin] = tx.splitCoins({ kind: 'GasCoin' }, [tx.pure(amount)]);

		tx.transferObjects(
			[coin],
			tx.pure(suiSampleKeypair.getPublicKey().toSuiAddress()),
		);

		return 0;
	} else return 0;
};

const constructSendSOLTransaction = async (
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

	const blockhash = await getLatestBlockhashOnSolana();

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions,
	}).compileToV0Message();

	const a = new VersionedTransaction(message);
	console.log(a);
	return a;
};

const constructSendSPLTokenTransactionInSol = async (
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
	token: Token | Collectible,
) => {
	const mintAddress = new PublicKey(token.account.mint as string);

	const AssociatedAddressOfSender = getAssociatedTokenAddressSync(
		mintAddress,
		sender,
	);
	const AssociatedAddressOfReceiver = getAssociatedTokenAddressSync(
		mintAddress,
		receiver,
	);

	const conn = await getSolanaConnection();
	const associatedAccountOfReceiver = await conn.getAccountInfo(
		AssociatedAddressOfReceiver,
	);

	const instructions = [];

	if (!associatedAccountOfReceiver) {
		instructions.push(
			createAssociatedTokenAccountInstruction(
				sender,
				AssociatedAddressOfReceiver,
				receiver,
				mintAddress,
			),
		);
	}

	instructions.push(
		createTransferInstruction(
			AssociatedAddressOfSender,
			AssociatedAddressOfReceiver,
			sender,
			amount,
		),
	);

	const blockhash = await getLatestBlockhashOnSolana();

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
