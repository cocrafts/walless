import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { type TokenDocument } from '@walless/store';

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
): Promise<TokenDocument[]> => {
	const key = new PublicKey(address);
	const response = await connection.getParsedTokenAccountsByOwner(key, {
		programId: TOKEN_PROGRAM_ID,
	});

	return response.value.map(({ account }) => {
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
		};
	});
};
