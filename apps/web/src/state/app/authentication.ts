import { Ed25519Keypair as SuiPair } from '@mysten/sui.js';
import { Keypair as SolPair } from '@solana/web3.js';
import {
	type SubVerifierDetails,
	type TorusLoginResponse,
} from '@toruslabs/customauth';
import { makeProfile, ThresholdResult } from '@walless/app';
import { appState } from '@walless/app';
import { Networks, UserProfile } from '@walless/core';
import { encryptWithPasscode } from '@walless/crypto';
import {
	type PrivateKeyDocument,
	type PublicKeyDocument,
	type SettingDocument,
} from '@walless/store';
import { db } from 'utils/pouch';
import { router } from 'utils/routing';
import {
	configureSecurityQuestionShare,
	importAvailableShares,
	key,
	recoverDeviceShareFromPasscode,
} from 'utils/w3a';

interface InternalCache {
	loginResponse?: TorusLoginResponse;
}

const cache: InternalCache = {};

export const setProfile = async (profile: UserProfile) => {
	appState.profile = profile;

	await db.upsert<SettingDocument>('settings', async (doc) => {
		doc.type = 'Setting';
		doc.version = '0.0.1';
		doc.profile = profile;
		return doc;
	});
};

export const signInWithGoogle = async () => {
	const loginParams: SubVerifierDetails = {
		typeOfLogin: 'google',
		verifier: 'walless-gc',
		clientId: GOOGLE_CLIENT_ID,
	};

	try {
		appState.authenticationLoading = true;

		await key.serviceProvider.init({ skipSw: true, skipPrefetch: true });
		cache.loginResponse = await key.serviceProvider.triggerLogin(loginParams);
		await key.initialize();
		const status = await importAvailableShares();

		if (status === ThresholdResult.Initializing) {
			await router.navigate('/passcode/create');
		} else if (status === ThresholdResult.Missing) {
			await router.navigate('/passcode/enter');
		} else if (status === ThresholdResult.Ready) {
			await setProfile(makeProfile(cache.loginResponse));
			await router.navigate('/');
		}
	} finally {
		appState.authenticationLoading = false;
	}
};

export const confirmPasscode = async (passcode: string) => {
	await configureSecurityQuestionShare(passcode);

	await storeAuthenticatedRecords(passcode, cache.loginResponse);
	await router.navigate('/');
};

export const recoverWithPasscode = async (passcode: string) => {
	appState.passcodeLoading = true;
	appState.passcodeError = undefined;

	const unlockSuccess = await recoverDeviceShareFromPasscode(passcode);

	if (unlockSuccess) {
		await storeAuthenticatedRecords(passcode, cache.loginResponse);
		await router.navigate('/');
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

		writePromises.push(
			db.put<PrivateKeyDocument>({
				_id: id,
				type: 'PrivateKey',
				keyType: type,
				...encrypted,
			}),
		);

		if (type === 'ed25519') {
			const solPair = SolPair.fromSecretKey(key);
			const solAddress = solPair.publicKey.toString();
			const suiPair = SuiPair.fromSecretKey(key.slice(0, 32));
			const suiAddress = suiPair.getPublicKey().toSuiAddress();

			writePromises.push(
				db.put<PublicKeyDocument>({
					_id: solAddress,
					type: 'PublicKey',
					privateKeyId: id,
					network: Networks.solana,
				}),
			);

			writePromises.push(
				db.put<PublicKeyDocument>({
					_id: suiAddress,
					privateKeyId: id,
					type: 'PublicKey',
					network: Networks.sui,
				}),
			);
		}
	}

	await Promise.all(writePromises);
};
