import { Metaplex } from '@metaplex-foundation/js';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

import { connection } from './utils/connection';
import SolanaConnection from './connection';

type QueryResult = {
	balance: number;
	listTokens: Token[];
};

type Token = {
	mint: PublicKey;
	amount: bigint;
};

/**
 * This function get all necessary for render wallet
 *
 * @param {String} address - public key as string
 * @return {QueryResult}
 */
export async function queryAll(address: string): Promise<QueryResult> {
	const tokenAccounts = await getTokens(address);
	const balance = await getBalance(address);
	const listTokens = new Array<Token>();

	tokenAccounts.value.forEach((tokenAccount) => {
		const accountData = AccountLayout.decode(tokenAccount.account.data);
		listTokens.push({
			mint: accountData.mint,
			amount: accountData.amount,
		});
	});

	const result = {
		balance: balance,
		listTokens: listTokens,
	};

	return result;
}

export async function getTokens(keyString: string) {
	const tokenAccounts =
		await SolanaConnection.getConnection().getTokenAccountsByOwner(
			new PublicKey(keyString),
			{
				programId: TOKEN_PROGRAM_ID,
			},
		);

	return tokenAccounts;
}

export async function getBalance(keyString: string) {
	const balance = await SolanaConnection.getConnection().getBalance(
		new PublicKey(keyString),
	);

	return balance;
}

export const getNFTs = (address: string) => {
	const metaplex = new Metaplex(connection);
	console.log(metaplex, '<--');
};

// NFT is a mint. just like SRM, USDC ..., the only different is that NFT's supply is 1
//
// if we want to get NFT's metadata, first we need to know what is the mint address.
// here I take a random DAPE as an example
// https://explorer.solana.com/address/9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A
//
// tokenmeta is a PDA a which derived by mint address
// the formula is ['metadata', metadata_program_id, mint_id]
// is it totally fine to forget it because sdk already wrapped it for us
// try {
//     const connection = new Connection(clusterApiUrl("mainnet-beta"));
//     const keypair = Keypair.generate();

//     const metaplex = Metaplex.make(connection)
//         .use(keypairIdentity(keypair))
//         .use(bundlrStorage())

//     const key = new PublicKey('D4zHiywS9ELy7pvFKjvsR3KNJxAvi72EqsmkUhVXG471')

//     const nft = await metaplex.nfts().findByMint({ mintAddress: key });

//     console.log(nft);

// } catch (error) {
//     console.log(error)
// }
