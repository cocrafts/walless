import { Networks } from '@walless/core';
import { checkValidAddress } from 'utils/transaction';

import { txContext } from '../context';

export const totalCheckFieldsToContinue = () => {
	const {
		type,
		collection: nftCollection,
		collectible: nftCollectible,
		receiver,
	} = txContext.tx;

	if (type === 'Collectible') {
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
	}

	return {
		valid: true,
		message: '',
	};
};

export const gasilonSupportedNetworks: Networks[] = [Networks.solana];
