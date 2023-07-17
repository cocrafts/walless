import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { AccountChangeCallback, Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { tokenActions } from '@walless/engine';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';

import type { EngineRealtimeHandler } from '../utils/type';

import { solMint } from './shared';

export const solanaEngineRealtimeEvents: EngineRealtimeHandler<Connection> = {
	subscribeAccountChangeEvent: async ({ storage, connection }) => {
		const keyResult = await storage.find(selectors.solanaKeys);
		const keys = keyResult.docs as PublicKeyDocument[];
		const account = new PublicKey(keys[0]._id);

		const subscriptionList: number[] = [];

		const handleAccountChange: AccountChangeCallback = (info) => {
			let balance;
			let mint;
			let owner;

			if (info.data.byteLength === 0) {
				owner = account.toString();
				mint = solMint;
				balance = info.lamports.toString();
			} else {
				const data = AccountLayout.decode(info.data);
				owner = data.owner.toString();
				mint = data.mint.toString();
				balance = data.amount.toString();
			}

			tokenActions.updateBalance(owner, mint, balance);
		};

		subscriptionList.push(
			connection.onAccountChange(account, handleAccountChange),
		);

		connection
			.getTokenAccountsByOwner(account, {
				programId: TOKEN_PROGRAM_ID,
			})
			.then((res) => {
				res.value.forEach((ata) =>
					subscriptionList.push(
						connection.onAccountChange(ata.pubkey, handleAccountChange),
					),
				);
			});
	},
};
