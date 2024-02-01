import { Networks } from '@walless/core';
import { checkValidAddress } from 'utils/transaction';

import { txContext } from '../context';

export const totalCheckFieldsToContinue = () => {
	const {
		type,
		token,
		collection: nftCollection,
		collectible: nftCollectible,
		receiver,
		amount,
	} = txContext.tx;

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
			if (!amount || parseFloat(amount) <= 0) {
				return {
					valid: false,
					message: 'Try again with valid number',
				};
			} else if (parseFloat(amount) > balance) {
				return {
					valid: false,
					message: 'Insufficient balance to send',
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

export const gasilonSupportedNetworks: Networks[] = [Networks.solana];
