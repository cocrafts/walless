import type { Networks } from '@walless/core';

import { transactionContext } from '../../../state/transaction';
import { injectedElements } from '../../../state/transaction';

export const totalCheckFieldsToContinue = () => {
	const { type, token, nftCollection, nftCollectible, receiver, amount } =
		transactionContext;
	const { checkValidAddress } = injectedElements;

	switch (type) {
		case 'Token': {
			if (!token)
				return {
					valid: false,
					message: 'Please choose token to transfer',
				};

			if (!receiver) {
				return {
					valid: false,
					message: 'Please type recipient address',
				};
			} else {
				const result = checkValidAddress(receiver, token.network as Networks);
				if (!result.valid) return result;
			}

			const balance =
				parseFloat(token.account.balance) / 10 ** token.account.decimals;
			if (!amount) {
				return {
					valid: false,
					message: 'Please type token amount to transfer',
				};
			} else if (parseFloat(amount) > balance) {
				return {
					valid: false,
					message: 'Your balance is not enough',
				};
			}
			break;
		}
		case 'Collectible': {
			if (!nftCollection)
				return {
					valid: false,
					message: 'Please choose collection to transfer',
				};

			if (!nftCollectible)
				return {
					valid: false,
					message: 'Please choose NFT to transfer',
				};

			if (!receiver) {
				return {
					valid: false,
					message: 'Please type recipient address',
				};
			} else {
				const result = checkValidAddress(
					receiver,
					nftCollection.network as Networks,
				);
				if (!result.valid) return result;
			}
			break;
		}
	}

	return {
		valid: true,
		message: '',
	};
};
