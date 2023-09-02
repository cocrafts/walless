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

export * from './src/keys';
export * from './src/passcode';
export * from './src/recovery';
export * from './src/store';
