import type { WalletInvitation } from '@walless/graphql';
import { queries } from '@walless/graphql';
import { modules } from '@walless/ioc';

export const validateInvitationCode = async (code: string): Promise<string> => {
	const { walletInvitation } = await modules.qlClient.request<{
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

export * from './keys';
export * from './passcode';
export * from './recovery';
export * from './store';
