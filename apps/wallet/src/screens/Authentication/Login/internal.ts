import { logger } from '@walless/core';
import { showError } from 'modals/Error';
import {
	checkInvitationCode,
	signInWithApple,
	signInWithGoogle,
	signInWithTorusKey,
	ThresholdResult,
} from 'utils/auth';
import type { FirebaseUser } from 'utils/firebase';
import { navigate } from 'utils/navigation';

export enum SignInMethod {
	Google = 'Google',
	Apple = 'Apple',
}

export const signIn = async (
	invitationCode?: string,
	method: SignInMethod = SignInMethod.Google,
) => {
	let user: FirebaseUser;

	try {
		if (method === SignInMethod.Google) {
			user = await signInWithGoogle();
		} else if (method === SignInMethod.Apple) {
			user = await signInWithApple();
		} else {
			throw new Error('Unsupported sign-in method');
		}
	} catch (error) {
		showError({ errorText: 'Something went wrong' });
		logger.error(`Error when sign-in with ${method}`, error);
		return;
	}

	try {
		checkInvitationCode(user, invitationCode);
	} catch (error) {
		showError({ errorText: (error as Error).message });
		logger.error('Error when checking invitation code', error);
		navigate('Authentication', { screen: 'Invitation' });
		return;
	}

	try {
		const status = await signInWithTorusKey(user);
		if (status === ThresholdResult.Initializing) {
			navigate('Authentication', { screen: 'CreatePasscode' });
		} else if (status === ThresholdResult.Missing) {
			navigate('Authentication', { screen: 'Recovery' });
		} else if (status === ThresholdResult.Ready) {
			navigate('Dashboard');
		}
	} catch (error) {
		showError({ errorText: 'Something went wrong' });
		logger.error('Error when sign-in with w3a', error);
		return;
	}
};
