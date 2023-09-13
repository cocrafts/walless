import { Ed25519Keypair as SuiPair } from '@mysten/sui.js';
import { Keypair as SolPair } from '@solana/web3.js';
import { generateSecretKey, InMemorySigner } from '@taquito/signer';
import { generateID } from '@tkey/common-types';
import { Networks } from '@walless/core';
import { encryptWithPasscode } from '@walless/crypto';
import {
	APTOS_DEVNET,
	APTOS_FAUCET_DEVNET,
} from '@walless/engine/aptos/shared';
import { modules } from '@walless/ioc';
import type { PrivateKeyDocument, PublicKeyDocument } from '@walless/store';
import { AptosAccount, FaucetClient } from 'aptos';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { decode } from 'bs58';
import { derivePath } from 'ed25519-hd-key';
import { SeedPhraseFormatType } from 'utils/w3a';
import { key } from 'utils/w3a';

const defaultPrefixDerivationPaths: Array<{
	path: string;
	network: Networks;
}> = [
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
];

export const initBySeedPhraseModule = async (passcode: string) => {
	let seedPhrases = await key.modules.seedPhraseModule.getSeedPhrases();
	if (seedPhrases.length === 0) {
		await key.modules.seedPhraseModule.setSeedPhrase(
			SeedPhraseFormatType.PRIMARY,
			generateMnemonic(),
		);
		seedPhrases = await key.modules.seedPhraseModule.getSeedPhrases();
	}

	const seedPhrasePromises = seedPhrases.map(async (storedSeed) => {
		const rootSeed = mnemonicToSeedSync(storedSeed.seedPhrase);
		return Promise.all(
			defaultPrefixDerivationPaths.map(async (prefixObject) => {
				let type;
				let address;
				let privateKey;
				switch (prefixObject.network) {
					case Networks.solana: {
						const seed = derivePath(
							`m/${prefixObject.path}/0'/0'`,
							rootSeed.toString('hex'),
						).key;
						const keypair = SolPair.fromSeed(seed);
						type = 'ed25519';
						address = keypair.publicKey.toString();
						privateKey = keypair.secretKey;
						break;
					}
					case Networks.sui: {
						const keypair = SuiPair.deriveKeypair(
							storedSeed.seedPhrase,
							`m/${prefixObject.path}/0'/0'/0'`,
						);
						type = 'ed25519';
						address = keypair.getPublicKey().toSuiAddress();
						privateKey = Buffer.from(keypair.export().privateKey, 'base64');
						break;
					}
					case Networks.tezos: {
						const keypair = await InMemorySigner.fromSecretKey(
							generateSecretKey(
								rootSeed,
								`m/${prefixObject.path}/0'/0'`,
								'ed25519',
							),
						);
						type = 'ed25519';
						address = await keypair.publicKeyHash();
						privateKey = decode(await keypair.secretKey());
						break;
					}
				}

				if (privateKey && address) {
					const id = generateID();
					const encrypted = await encryptWithPasscode(passcode, privateKey);

					return Promise.all([
						modules.storage.put<PrivateKeyDocument>({
							_id: id,
							type: 'PrivateKey',
							keyType: type || '',
							...encrypted,
						}),
						modules.storage.put<PublicKeyDocument>({
							_id: address,
							type: 'PublicKey',
							privateKeyId: id,
							network: prefixObject.network,
						}),
					]);
				}
			}),
		);
	});

	// ---- Aptos Hackathon ----
	const newAptosAccount = new AptosAccount();
	const id = generateID();
	const encrypted = await encryptWithPasscode(
		passcode,
		Buffer.from(newAptosAccount.toPrivateKeyObject().privateKeyHex),
	);

	const faucetClient = new FaucetClient(APTOS_DEVNET, APTOS_FAUCET_DEVNET);

	await faucetClient.fundAccount(newAptosAccount.address(), 100_000_000);

	await modules.storage.put<PrivateKeyDocument>({
		_id: id,
		type: 'PrivateKey',
		keyType: '',
		...encrypted,
	});

	await modules.storage.put<PublicKeyDocument>({
		_id: newAptosAccount.address().toShortString(),
		type: 'PublicKey',
		privateKeyId: id,
		network: Networks.aptos,
	});
	// ---- End of Aptos Hackathon ----

	await Promise.all(seedPhrasePromises);
};

/**
 * @deprecated this method should be replaced by initBySeedPhrase
 */
export const initByPrivateKeyModule = async (passcode: string) => {
	const privateKeys = await key.modules.privateKeyModule.getPrivateKeys();
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

			/**
			 * Using bs58 to keep format of tezos key string
			 * */
			const encryptedTezosKey = await encryptWithPasscode(
				passcode,
				decode(await tezosPair.secretKey()),
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
};
