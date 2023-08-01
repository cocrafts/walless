import type { InvitationCode } from '@walless/graphql';
import { queries } from '@walless/graphql';
import { qlClient } from '@walless/graphql';

export const validateInvitationCode = async (code: string) => {
	const { invitationCode } = await qlClient.request<{
		invitationCode: InvitationCode;
	}>(queries.invitationCode, { code });

	if (!invitationCode) {
		throw Error('This invitation code is invalid!');
	} else if (invitationCode?.email) {
		throw Error('This invitation code is used by another account!');
	} else {
		return code;
	}
};

export * from './keys';
export * from './passcode';
export * from './store';
