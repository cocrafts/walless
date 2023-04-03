import { Secp256k1Keypair as SuiPair } from '@mysten/sui.js';
import { Keypair as SolPair } from '@solana/web3.js';
import { SubVerifierDetails, TorusLoginResponse } from '@toruslabs/customauth';
import { Networks } from '@walless/core';
import { encryptWithPasscode } from '@walless/crypto';
import { UserProfile } from '@walless/storage';
import { hashRouter } from 'utils/router';
import { db } from 'utils/storage';
import {
	configureSecurityQuestionShare,
	importAvailableShares,
	key,
	recoverDeviceShareFromPasscode,
	ThresholdResult,
} from 'utils/w3a';

import { appState } from './internal';

interface InternalCache {
	loginResponse?: TorusLoginResponse;
}

const cache: InternalCache = {};

const makeProfile = ({
	publicAddress,
	userInfo,
}: TorusLoginResponse): UserProfile => {
	return {
		id: publicAddress,
		email: userInfo.email,
		name: userInfo.name,
		profileImage: userInfo.profileImage,
	};
};

export const setProfile = async (profile: UserProfile): Promise<void> => {
	appState.profile = profile;
	await db.settings.put({
		id: 1,
		version: '0.0.1',
		profile,
	});
};

export const signInGoogle = async () => {
	const loginParams: SubVerifierDetails = {
		typeOfLogin: 'google',
		verifier: 'walless001',
		clientId: GOOGLE_CLIENT_ID,
	};

	try {
		appState.authenticationLoading = true;

		await key.serviceProvider.init({ skipSw: true });
		cache.loginResponse = await key.serviceProvider.triggerLogin(loginParams);
		await key.initialize();
		const status = await importAvailableShares();

		if (status === ThresholdResult.Initializing) {
			await hashRouter.navigate('/passcode');
		} else if (status === ThresholdResult.Missing) {
			await hashRouter.navigate('/enter-passcode');
		} else if (status === ThresholdResult.Ready) {
			await setProfile(makeProfile(cache.loginResponse));
			await hashRouter.navigate('/');
		}
	} finally {
		appState.authenticationLoading = false;
	}
};

export const confirmPasscode = async (passcode: string) => {
	await configureSecurityQuestionShare(passcode);

	await storeAuthenticatedRecords(passcode, cache.loginResponse);
	await hashRouter.navigate('/');
};

export const recoverWithPasscode = async (passcode: string) => {
	appState.passcodeLoading = true;
	appState.passcodeError = undefined;

	const unlockSuccess = await recoverDeviceShareFromPasscode(passcode);

	if (unlockSuccess) {
		await storeAuthenticatedRecords(passcode, cache.loginResponse);
		await hashRouter.navigate('/');
	} else {
		appState.passcodeError = 'wrong passcode, please try again!';
	}

	appState.passcodeLoading = false;
};

export const storeAuthenticatedRecords = async (
	passcode: string,
	login?: TorusLoginResponse,
): Promise<void> => {
	await key.reconstructKey();
	const privateKeys = await key.modules.privateKeyModule.getPrivateKeys();

	if (login?.userInfo) {
		await setProfile(makeProfile(login));
	}

	if (privateKeys.length === 0) {
		await key.modules.privateKeyModule.setPrivateKey('secp256k1n');
		await key.modules.privateKeyModule.setPrivateKey('ed25519');
	}

	const writePromises = [];
	for (const {
		id,
		type,
		privateKey,
	} of await key.modules.privateKeyModule.getPrivateKeys()) {
		const key = Buffer.from(privateKey as never, 'hex');
		const encrypted = await encryptWithPasscode(passcode, key);

		writePromises.push(db.privateKeys.put({ id, type, ...encrypted }));

		if (type === 'ed25519') {
			const solPair = SolPair.fromSecretKey(key);
			const solAddress = solPair.publicKey.toString();
			const suiPair = SuiPair.fromSecretKey(key.slice(0, 32));
			const suiAddress = suiPair.getPublicKey().toSuiAddress();

			writePromises.push(
				db.publicKeys.put({
					id: solAddress,
					privateKeyId: id,
					network: Networks.solana,
				}),
			);

			writePromises.push(
				db.publicKeys.put({
					id: suiAddress,
					privateKeyId: id,
					network: Networks.sui,
				}),
			);
		}
	}

	await Promise.all(writePromises);
};
