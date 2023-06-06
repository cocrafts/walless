import { Ed25519Keypair as SuiPair } from '@mysten/sui.js';
import { Keypair as SolPair } from '@solana/web3.js';
import { generateSecretKey, InMemorySigner } from '@taquito/signer';
import { appState, makeProfile, ThresholdResult } from '@walless/app';
import { type UserProfile, Networks, runtime } from '@walless/core';
import { encryptWithPasscode } from '@walless/crypto';
import {
	type InvitationAccount,
	type InvitationCode,
	mutations,
	qlClient,
	queries,
} from '@walless/graphql';
import { modules } from '@walless/ioc';
import {
	type PrivateKeyDocument,
	type PublicKeyDocument,
	type SettingDocument,
} from '@walless/store';
import {
	type User,
	type UserCredential,
	GoogleAuthProvider,
	signInWithCredential,
	signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from 'utils/firebase';
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
		doc.config = { hideBalance: true };

		return doc;
	});
};

export const signInWithGoogle = async (invitationCode?: string) => {
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
		}

		/* for Development mode, there is no invitation required - just let them in */
		if (__DEV__) {
			await createKeyAndEnter();
		} else {
			const { invitationAccount } = await qlClient.request<{
				invitationAccount: InvitationAccount;
			}>(queries.invitationAccount, {
				email: cache.loginResponse.user.email,
			});

			if (!invitationAccount && invitationCode) {
				await qlClient.request(mutations.bindInvitation, {
					code: invitationCode || appState.invitationCode,
					email: cache.loginResponse.user.email,
				});
				await createKeyAndEnter();
			} else if (!invitationAccount && !invitationCode) {
				appState.isAbleToSignIn = false;
				appState.signInError =
					'The account does not exist. Enter your Invitation code';
			} else {
				await createKeyAndEnter();
			}
		}
	} finally {
		appState.authenticationLoading = false;
	}
};

export const createKeyAndEnter = async () => {
	const user = cache.loginResponse?.user as User;
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
		await setProfile(makeProfile(cache.loginResponse as never));
		await router.navigate('/');
	}
};

export const enterInvitationCode = async (code: string) => {
	/* eslint-disable-next-line */
	const { invitationCode } = await qlClient.request<{
		invitationCode: InvitationCode;
	}>(queries.invitationCode, { code });

	appState.invitationError = undefined;

	if (!invitationCode) {
		appState.invitationError = 'This invitation code is invalid!';
	} else if (invitationCode?.email) {
		appState.invitationError =
			'This invitation code is used by another account!';
	} else {
		appState.invitationCode = code;
		await router.navigate('/login');
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

			/**
			 * For Tezos, we temporarily use base private as a seed to generate new private key
			 * */
			const tezosPair = await InMemorySigner.fromSecretKey(
				generateSecretKey(key, "44'/1729'", 'ed25519'),
			);
			const tezosAddress = await tezosPair.publicKeyHash();

			const encryptedTezosKey = await encryptWithPasscode(
				passcode,
				Buffer.from(await tezosPair.secretKey(), 'hex'),
			);
			writePromises.push(
				modules.storage.put<PrivateKeyDocument>({
					_id: id + Networks.tezos,
					type: 'PrivateKey',
					keyType: type,
					...encryptedTezosKey,
				}),
			);

			writePromises.push(
				modules.storage.put<PublicKeyDocument>({
					_id: tezosAddress,
					privateKeyId: id + Networks.tezos,
					type: 'PublicKey',
					network: Networks.tezos,
				}),
			);
		}
	}

	await Promise.all(writePromises);
	modules.engine.start();
};
