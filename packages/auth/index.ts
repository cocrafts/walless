import type { WalletInvitation } from '@walless/graphql';
import { queries } from '@walless/graphql';

import { injectedModules } from './src/ioc';

export const validateInvitationCode = async (code: string): Promise<string> => {
	const { walletInvitation } = await injectedModules.qlClient.request<{
		walletInvitation: WalletInvitation;
	}>(queries.walletInvitation, { code });

	if (!walletInvitation) {
		throw Error('This invitation code is invalid!');
	} else if (walletInvitation?.email) {
		throw Error('This invitation code is used by another account!');
	} else {
		return code;
	}
};

export const NUMBER_OF_SHARES_WITH_DEPRECATED_PASSCODE = 3;

export { injectedModules as authModules } from './src/ioc';
export * from './src/keys';
export * from './src/passcode';
export * from './src/recovery';
export * from './src/store';
export * from './src/w3a';
