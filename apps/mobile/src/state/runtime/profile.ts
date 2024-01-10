import type { Account } from '@walless/graphql';
import { mutations, queries } from '@walless/graphql';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { qlClient } from 'utils/graphql';

export const syncRemoteProfile = async () => {
	const keyResult = await modules.storage.find<PublicKeyDocument>(
		selectors.allKeys,
	);

	if (keyResult.docs.length === 0) return;

	const { userAccount } = await qlClient.request<{
		userAccount: Account;
	}>(queries.userAccount);

	if (keyResult.docs.length !== userAccount.walletCount) {
		const wallets = keyResult.docs.map((key) => ({
			address: key._id,
			network: key.network,
		}));

		await qlClient.request(mutations.trackAccountWallets, { wallets });
	}
};
