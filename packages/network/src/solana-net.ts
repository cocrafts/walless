import { Metaplex } from '@metaplex-foundation/js';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

import { connection } from './utils/connection';
import SolanaConnection from './connection';
import type { Token } from './network-interface';
import { TokenType } from './network-interface';

// type QueryResult = {
// 	balance: number;
// 	listTokens: Token[];
// };

type TokenAccount = {
	mint: PublicKey;
	amount: bigint;
};

export default class SolanaNet {
	/**
	 * This function get all necessary for render wallet
	 *
	 * @param {String} address - public key as string
	 * @return {Token}
	 */
	static async queryAllByAddress(address: string): Promise<Token> {
		const tokenAccounts = await SolanaNet.getTokens(address);
		const balance = await SolanaNet.getBalance(address);
		const listTokens = new Array<TokenAccount>();

		tokenAccounts.value.forEach((tokenAccount) => {
			const accountData = AccountLayout.decode(tokenAccount.account.data);
			listTokens.push({
				mint: accountData.mint,
				amount: accountData.amount,
			});
		});

		return {
			name: 'Solona',
			symbol: 'SOL',
			balance: (balance / LAMPORTS_PER_SOL).toString(),
			tokenAccounts: listTokens,
			type: TokenType.SOLANA_TOKEN,
		};
	}

	static async getTokens(keyString: string) {
		const tokenAccounts =
			await SolanaConnection.getConnection().getTokenAccountsByOwner(
				new PublicKey(keyString),
				{
					programId: TOKEN_PROGRAM_ID,
				},
			);

		return tokenAccounts;
	}

	static async getBalance(keyString: string) {
		const balance = await SolanaConnection.getConnection().getBalance(
			new PublicKey(keyString),
		);

		return balance;
	}

	static async subcribeWithPublicKeyString(
		publicKeyString: string,
		callback: web3.AccountChangeCallback,
	) {
		return SolanaConnection.getConnection().onAccountChange(
			new web3.PublicKey(publicKeyString),
			callback,
		);
	}

	static async unSubcribe(connectionId: number) {
		SolanaConnection.getConnection().removeAccountChangeListener(connectionId);
	}

	getNFTs = () => {
		const metaplex = new Metaplex(connection);
		console.log(metaplex, '<--');
	};
}
