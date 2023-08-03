import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import type { MetadataDocument, TokenDocument } from '@walless/store';

import type { GetSolanaMetadataFunction } from './metadata';
import { getSolanaMetadata } from './metadata';

export const getTokensByOwner = async (
	connection: Connection,
	address: PublicKey,
) => {
	return (
		await connection.getTokenAccountsByOwner(address, {
			programId: TOKEN_PROGRAM_ID,
		})
	).value
		.map((t) => {
			return {
				pubkey: t.pubkey,
				account: {
					...t.account,
					data: AccountLayout.decode(t.account.data),
				},
			};
		})
		.filter((t) => t.account.data.amount > 1);
};

export const solMint = '11111111111111111111111111111111';

export const getTokenMetadata = async (
	connection: Connection,
	mint: PublicKey,
): Promise<Metadata | null> => {
	const [metadataPDA] = PublicKey.findProgramAddressSync(
		[Buffer.from('metadata'), METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
		METADATA_PROGRAM_ID,
	);

	const tokenMetadata = await connection.getAccountInfo(metadataPDA);

	return tokenMetadata ? Metadata.deserialize(tokenMetadata.data)[0] : null;
};

const METADATA_PROGRAM_ID = new PublicKey(
	'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
);

export const getSolanaTokenMetadata = async (
	connection: Connection,
	mint: PublicKey,
) => {
	const [metadataPDA] = PublicKey.findProgramAddressSync(
		[Buffer.from('metadata'), METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
		METADATA_PROGRAM_ID,
	);
	const [info, metadata] = await Promise.all([
		connection.getAccountInfo(mint),
		connection.getAccountInfo(metadataPDA),
	]);

	console.log(info, metadata);
};

export const getSolanaTokensByAddress = async (
	connection: Connection,
	address: string,
	getMetadata: GetSolanaMetadataFunction = getSolanaMetadata,
): Promise<TokenDocument[]> => {
	const key = new PublicKey(address);
	const response = await connection.getParsedTokenAccountsByOwner(key, {
		programId: TOKEN_PROGRAM_ID,
	});
	const resultPromises = response.value.map(async ({ account }) => {
		const { data, owner } = account;
		const info = data.parsed?.info || {};

		return {
			_id: `${address}/${info.mint}`,
			network: Networks.solana,
			type: 'Token',
			account: {
				mint: info.mint,
				owner: owner.toString(),
				address,
				balance: info.tokenAmount?.amount,
				decimals: info.tokenAmount?.decimals,
			},
			metadata: await getMetadata(connection, info.mint),
		} as TokenDocument;
	});

	resultPromises.push(
		(async () => {
			const balance = await connection.getBalance(key);

			return {
				_id: `${address}/${solMint}`,
				network: Networks.solana,
				type: 'Token',
				account: {
					mint: solMint,
					owner: 'system',
					address,
					balance: String(balance),
					decimals: 9,
				},
				metadata: solMetadata,
			};
		})(),
	);

	return await Promise.all(resultPromises);
};

export const solMetadata: MetadataDocument = {
	_id: solMint,
	type: 'Metadata',
	network: Networks.solana,
	timestamp: new Date().toISOString(),
	name: 'Solana',
	symbol: 'SOL',
	imageUri:
		'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
};
