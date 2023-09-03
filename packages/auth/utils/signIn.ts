import { NUMBER_OF_SHARES_WITH_DEPRECATED_PASSCODE } from './passcode';
import { initAndRegisterWallet } from './recovery';
import { getSharesStatus, key, ThresholdResult } from './w3a';

export interface TorusSignInOptions {
	verifier: string;
	verifierId: string;
	privateKey: string;
	handlePasscode: () => Promise<void>;
	handleRecovery: () => Promise<void>;
	handleDeprecatedPasscode: () => Promise<void>;
	handleReady: () => Promise<void>;
	handleError: () => Promise<void>;
}

export const signInWithTorusKey = async ({
	verifier,
	verifierId,
	privateKey,
	handlePasscode,
	handleRecovery,
	handleDeprecatedPasscode,
	handleReady,
	handleError,
}: TorusSignInOptions) => {
	const keyInstance = key();

	keyInstance.serviceProvider.postboxKey = privateKey as never;
	/* eslint-disable */
	(keyInstance.serviceProvider as any).verifierName = verifier;
	(keyInstance.serviceProvider as any).verifierId = verifierId;
	/* eslint-enable */
	await keyInstance.initialize();
	const status = await getSharesStatus();

	if (status === ThresholdResult.Initializing) {
		const registeredAccount = await initAndRegisterWallet();

		if (registeredAccount?.identifier) {
			await handlePasscode();
		} else {
			await handleError();
		}
	} else if (status === ThresholdResult.Missing) {
		let isLegacyAccount = false;

		try {
			const q = keyInstance.modules.securityQuestions.getSecurityQuestions();
			isLegacyAccount = q === 'universal-passcode';
		} catch (error) {
			console.log('Failed to get security question', error);
		}

		const { totalShares } = keyInstance.getKeyDetails();
		const migrated = totalShares > NUMBER_OF_SHARES_WITH_DEPRECATED_PASSCODE;
		const isRecovery = !isLegacyAccount || migrated;

		if (isRecovery) {
			await handleRecovery();
		} else {
			await handleDeprecatedPasscode();
		}
	} else if (status === ThresholdResult.Ready) {
		await handleReady();
	}
};
