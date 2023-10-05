import { Ed25519Keypair as SuiPair } from '@mysten/sui.js';
import { Keypair as SolPair } from '@solana/web3.js';
import { generateSecretKey, InMemorySigner } from '@taquito/signer';
import type { ISeedPhraseStore } from '@tkey/common-types';
import { generateID } from '@tkey/common-types';
import { Networks } from '@walless/core';
import { encryptWithPasscode } from '@walless/crypto';
import { modules } from '@walless/ioc';
import type { PrivateKeyDocument, PublicKeyDocument } from '@walless/store';
import { AptosAccount } from 'aptos';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { decode } from 'bs58';
import { derivePath } from 'ed25519-hd-key';

import { key, SeedPhraseFormatType } from './w3a';

export interface DerivationOptions {
	path: string;
	network: Networks;
}

export const defaultPrefixDerivationPaths: DerivationOptions[] = [
	{
		path: "44'/501'",
		network: Networks.solana,
	},
	{
		path: "44'/784'",
		network: Networks.sui,
	},
	{
		path: "44'/1729'",
		network: Networks.tezos,
	},
	{
		path: "44'/637'",
		network: Networks.aptos,
	},
];

export const initBySeedPhraseModule = async (passcode: string) => {
	let seedPhrases = await key().modules.seedPhraseModule.getSeedPhrases();

	if (seedPhrases.length === 0) {
		await key().modules.seedPhraseModule.setSeedPhrase(
			SeedPhraseFormatType.PRIMARY,
			generateMnemonic(),
		);

		seedPhrases = await key().modules.seedPhraseModule.getSeedPhrases();
	}

	const forSeedPhrasePromises = seedPhrases.map(async (storedSeed) => {
		const rootSeed = await mnemonicToSeed(storedSeed.seedPhrase);
		const forNetworkPromises = defaultPrefixDerivationPaths.map((option) => {
			return generateAndStoreKeypairs(option, storedSeed, rootSeed, passcode);
		});

		await Promise.all(forNetworkPromises);
	});

	await Promise.all(forSeedPhrasePromises);
};

const generateAndStoreKeypairs = async (
	{ path, network }: DerivationOptions,
	storedSeed: ISeedPhraseStore,
	rootSeed: Buffer,
	passcode: string,
) => {
	let keyType: string | undefined = undefined;
	let address: string | undefined = undefined;
	let privateKey: never | undefined = undefined;

	if (network === Networks.solana) {
		const seed = derivePath(`m/${path}/0'/0'`, rootSeed.toString('hex')).key;
		const keypair = SolPair.fromSeed(seed);

		keyType = 'ed25519';
		address = keypair.publicKey.toString();
		privateKey = keypair.secretKey as never;
	} else if (network === Networks.sui) {
		const mnemoic = storedSeed.seedPhrase;
		const keypair = SuiPair.deriveKeypair(mnemoic, `m/${path}/0'/0'/0'`);

		keyType = 'ed25519';
		address = keypair.getPublicKey().toSuiAddress();
		privateKey = Buffer.from(keypair.export().privateKey, 'base64') as never;
	} else if (network === Networks.tezos) {
		const secret = generateSecretKey(rootSeed, `m/${path}/0'/0'`, 'ed25519');
		const keypair = await InMemorySigner.fromSecretKey(secret);
		keyType = 'ed25519';
		address = await keypair.publicKeyHash();
		privateKey = decode(await keypair.secretKey()) as never;
	} else if (network === Networks.aptos) {
		const mnemonics = storedSeed.seedPhrase;
		const keypair = AptosAccount.fromDerivePath(
			`m/${path}/0'/0'/0'`,
			mnemonics,
		);

		keyType = 'ed25519';
		address = keypair.address().toString();
		privateKey = keypair.signingKey.secretKey as never;
	}

	if (privateKey && address && keyType) {
		const id = generateID();
		const encrypted = await encryptWithPasscode(passcode, privateKey);
		const putPrivateKeyPromise = modules.storage.put<PrivateKeyDocument>({
			_id: id,
			type: 'PrivateKey',
			keyType,
			...encrypted,
		});
		const putPublicKeyPromise = modules.storage.put<PublicKeyDocument>({
			_id: address,
			type: 'PublicKey',
			privateKeyId: id,
			network,
		});

		await Promise.all([putPublicKeyPromise, putPrivateKeyPromise]);
	}
};

/**
 * @deprecated this method should be replaced by initBySeedPhrase
 */
export const initByPrivateKeyModule = async (passcode: string) => {
	console.log('init by private key module with passcode', passcode);
};
