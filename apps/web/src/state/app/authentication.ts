import { Ed25519Keypair as SuiPair } from '@mysten/sui.js';
import { Keypair as SolPair } from '@solana/web3.js';
import { appState, makeProfile, ThresholdResult } from '@walless/app';
import { type UserProfile, Networks, runtime } from '@walless/core';
import { encryptWithPasscode } from '@walless/crypto';
import {
	type PrivateKeyDocument,
	type PublicKeyDocument,
	type SettingDocument,
} from '@walless/store';
import {
	GoogleAuthProvider,
	signInWithCredential,
	signInWithPopup,
	UserCredential,
} from 'firebase/auth';
import { auth, googleProvider } from 'utils/firebase';
import modules from 'utils/modules';
import { router } from 'utils/routing';
import {
	configureSecurityQuestionShare,
	customAuth,
	importAvailableShares,
	key,
	recoverDeviceShareFromPasscode,
} from 'utils/w3a';

interface InternalCache {
	loginResponse?: UserCredential;
}

const cache: InternalCache = {};

export const setProfile = async (profile: UserProfile) => {
	appState.profile = profile;

	await modules.storage.upsert<SettingDocument>('settings', async (doc) => {
		doc.type = 'Setting';
		doc.version = '0.0.1';
		doc.profile = profile;
		return doc;
	});
};

export const signInWithGoogle = async () => {
	try {
		await key.serviceProvider.init({ skipSw: true, skipPrefetch: true });
		appState.authenticationLoading = true;

		if (runtime.isExtension) {
			const response = await chrome.identity.getAuthToken({
				interactive: true,
				scopes: ['email', 'profile'],
			});
			const credential = GoogleAuthProvider.credential(null, response.token);
			cache.loginResponse = await signInWithCredential(auth, credential);
		} else {
			cache.loginResponse = await signInWithPopup(auth, googleProvider);
			console.log(cache.loginResponse);
		}

		const { user } = cache.loginResponse;
		const verifierToken = await user.getIdToken(true);
		const verifier = WEB3AUTH_ID;
		const verifierId = user.uid;
		const verifierParams = { verifier_id: user.uid };
		const loginDetails = await customAuth.getTorusKey(
			verifier,
			verifierId,
			verifierParams,
			verifierToken,
		);

		key.serviceProvider.postboxKey = loginDetails.privateKey as never;

		/* eslint-disable */
		(key.serviceProvider as any).verifierName = verifier;
		(key.serviceProvider as any).verifierId = verifierId;
		/* eslint-enable */

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
	login?: UserCredential,
): Promise<void> => {
	await key.reconstructKey();
	const privateKeys = await key.modules.privateKeyModule.getPrivateKeys();

	if (login?.user) {
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
			modules.storage.put<PrivateKeyDocument>({
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
				modules.storage.put<PublicKeyDocument>({
					_id: solAddress,
					type: 'PublicKey',
					privateKeyId: id,
					network: Networks.solana,
				}),
			);

			writePromises.push(
				modules.storage.put<PublicKeyDocument>({
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
