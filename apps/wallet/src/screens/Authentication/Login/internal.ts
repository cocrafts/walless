import { logger } from '@walless/core';
import { showError } from 'modals/Error';
import { appState } from 'state/app';
import {
	checkInvitationCode,
	signInWithGoogle,
	signInWithTorusKey,
	ThresholdResult,
} from 'utils/auth';
import type { FirebaseUser } from 'utils/firebase';
import { navigate } from 'utils/navigation';

export const signIn = async (invitationCode?: string) => {
	let user: FirebaseUser;
	try {
		user = await signInWithGoogle();
	} catch (error) {
		showError({ errorText: 'Something went wrong' });
		logger.error('Error when sign-in with google', error);
		return;
	}

	try {
		await checkInvitationCode(user, invitationCode);
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
			if (appState.profile.email) {
				navigate('Dashboard');
			} else {
				navigate('Authentication', { screen: 'Recovery' });
			}
		}
	} catch (error) {
		showError({ errorText: 'Something went wrong' });
		logger.error('Error when sign-in with w3a', error);
		return;
	}
};
