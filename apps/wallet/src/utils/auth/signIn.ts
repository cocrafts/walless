import type { WalletInvitation } from '@walless/graphql';
import { mutations, queries } from '@walless/graphql';
import type { FirebaseUser } from 'utils/firebase';
import { qlClient } from 'utils/graphql';

import { CustomAuth, initServiceProvider } from './w3a/tkey';
import { initBySeedPhraseModule } from './keys';
import { initAndRegisterWallet } from './recovery';
import { signInWithGoogle } from './signInGoogle';
import {
	customAuthArgs,
	importAvailableShares,
	ThresholdResult,
	tkey,
} from './w3a';

const checkInvitationCode = async (
	user: FirebaseUser,
	invitationCode?: string,
) => {
	if (__DEV__) return;

	const { walletInvitation } = await qlClient.request<{
		walletInvitation: WalletInvitation;
	}>(queries.walletInvitation, {
		email: user.email,
	});

	if (!walletInvitation && invitationCode) {
		const success = await qlClient.request<boolean>(
			mutations.claimWalletInvitation,
			{
				code: invitationCode,
				email: user.email,
			},
		);
		if (!success) throw Error('Can not use this invitation code');
	} else if (!walletInvitation && !invitationCode) {
		throw Error('The account does not exist. Enter your Invitation code');
	}
};

const signInWithTorusKey = async (
	user: FirebaseUser,
): Promise<ThresholdResult> => {
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

	await initServiceProvider(tkey);

	tkey.serviceProvider.postboxKey = loginDetails.privateKey as never;
	/* eslint-disable */
	(tkey.serviceProvider as any).verifierName = verifier;
	(tkey.serviceProvider as any).verifierId = verifierId;
	/* eslint-enable */
	await tkey.initialize();
	const status = await importAvailableShares();

	return status;
};

const signInWithPasscode = async (
	passcode: string,
	handleInitFail?: (error: string) => void,
): Promise<void> => {
	const status = await importAvailableShares();

	if (status === ThresholdResult.Initializing) {
		const registeredAccount = await initAndRegisterWallet();
		if (!registeredAccount?.identifier) {
			handleInitFail?.('Failed to register account, please try again!');
			return;
		}
	}

	await tkey.reconstructKey();
	await initBySeedPhraseModule(passcode);
	await tkey.syncLocalMetadataTransitions();
};

export {
	checkInvitationCode,
	signInWithGoogle,
	signInWithPasscode,
	signInWithTorusKey,
};

export * from './w3a';
