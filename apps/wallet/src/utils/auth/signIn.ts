import CustomAuth from '@toruslabs/customauth-react-native-sdk';
import { logger } from '@walless/core';
import type { WalletInvitation } from '@walless/graphql';
import { mutations, queries } from '@walless/graphql';
import { showError } from 'modals/Error';
import type { UserAuth } from 'utils/firebase';
import { qlClient } from 'utils/graphql';
import { navigate } from 'utils/navigation';

import { initBySeedPhraseModule } from './keys';
import { initAndRegisterWallet } from './recovery';
import { signInWithGoogle } from './signInGoogle';
import {
	customAuthArgs,
	importAvailableShares,
	ThresholdResult,
	tkey,
} from './w3a';

export const signIn = async (invitationCode?: string) => {
	try {
		const user = await signInWithGoogle();

		if (!__DEV__) {
			checkInvitationCode(user, invitationCode);
		}

		const verifierToken = await user.getIdToken(true);
		const verifier = customAuthArgs.web3AuthClientId;
		const verifierId = user.uid;
		const verifierParams = { verifierIdField: 'sub', verifier_id: user.uid };
		const loginDetails = await CustomAuth.getTorusKey(
			verifier,
			verifierId,
			verifierParams,
			verifierToken,
		);

		await signInWithTorusKey({
			verifier,
			verifierId,
			privateKey: loginDetails.privateKey as string,
		});

		return user;
	} catch (error) {
		showError({ errorText: 'Something went wrong' });
		logger.error('Error during sign-in', error);
	}
};

type TorusSignInOptions = {
	verifier: string;
	verifierId: string;
	privateKey: string;
};

const signInWithTorusKey = async ({
	verifier,
	verifierId,
	privateKey,
}: TorusSignInOptions) => {
	const keyInstance = tkey;

	keyInstance.serviceProvider.postboxKey = privateKey as never;
	/* eslint-disable */
	(keyInstance.serviceProvider as any).verifierName = verifier;
	(keyInstance.serviceProvider as any).verifierId = verifierId;
	/* eslint-enable */
	await keyInstance.initialize();
	const status = await importAvailableShares();

	if (status === ThresholdResult.Initializing) {
		navigate('Authentication', { screen: 'CreatePasscode' });
	} else if (status === ThresholdResult.Missing) {
		navigate('Authentication', { screen: 'Recovery' });
	} else if (status === ThresholdResult.Ready) {
		navigate('Dashboard');
	}
};

export const signInWithPasscode = async (
	passcode: string,
	user: UserAuth | null,
	handleInitFail?: () => void,
): Promise<void> => {
	if (!user?.uid) {
		throw new Error('signInWithPasscode requires user profile from firebase');
	}

	const status = await importAvailableShares();
	if (status === ThresholdResult.Initializing) {
		const registeredAccount = await initAndRegisterWallet();
		if (!registeredAccount?.identifier) {
			handleInitFail?.();
			return;
		}
	}

	await tkey.reconstructKey();
	await initBySeedPhraseModule(passcode);
	await tkey.syncLocalMetadataTransitions();
};

const checkInvitationCode = async (user: UserAuth, invitationCode?: string) => {
	const { walletInvitation } = await qlClient.request<{
		walletInvitation: WalletInvitation;
	}>(queries.walletInvitation, {
		email: user.email,
	});

	if (!walletInvitation && invitationCode) {
		await qlClient.request(mutations.claimWalletInvitation, {
			code: invitationCode,
			email: user.email,
		});
	} else if (!walletInvitation && !invitationCode) {
		showError({
			errorText: 'The account does not exist. Enter your Invitation code',
		});

		navigate('Authentication', { screen: 'Invitation' });
		return;
	}
};
