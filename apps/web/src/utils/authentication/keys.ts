import { Ed25519Keypair as SuiPair } from '@mysten/sui.js';
import { Keypair as SolPair } from '@solana/web3.js';
import { generateSecretKey, InMemorySigner } from '@taquito/signer';
import { generateID } from '@tkey/common-types';
import type { UnknownObject } from '@walless/core';
import { Networks } from '@walless/core';
import { encryptWithPasscode } from '@walless/crypto';
import { modules } from '@walless/ioc';
import type { PrivateKeyDocument, PublicKeyDocument } from '@walless/store';
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

	const writePromises: Promise<UnknownObject>[] = [];

	for (let i = 0; i < seedPhrases.length; i++) {
		const storedSeed = seedPhrases[i];
		const rootSeed = mnemonicToSeedSync(storedSeed.seedPhrase);

		defaultPrefixDerivationPaths.forEach(async (prefixObject) => {
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

				writePromises.push(
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
				);
			}
		});
	}

	await Promise.all(writePromises);
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
