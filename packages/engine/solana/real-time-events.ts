import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
	type AccountChangeCallback,
	type PublicKey,
	Connection,
} from '@solana/web3.js';
import { tokenActions } from '@walless/engine';

import { solMint } from './shared';
import { solanaEndpoints } from '.';

type UnsubscribeAccountChangeEvent = () => void;
type Subscribe = (account: PublicKey) => UnsubscribeAccountChangeEvent;

export const subscribeAccountChangeEvent: Subscribe = (account: PublicKey) => {
	const connection = new Connection(solanaEndpoints.devnet);

	const subscriptionList: number[] = [];

	const handleAccountChange: AccountChangeCallback = (info) => {
		let balance;
		let mint;
		let owner;

		if (info.data.byteLength === 0) {
			balance = info.lamports.toString();
			mint = solMint;
			owner = account.toString();
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

	return () => {
		subscriptionList.forEach((subscription) =>
			connection.removeAccountChangeListener(subscription),
		);
	};
};
