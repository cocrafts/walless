import {
	decodeSuiPrivateKey,
	encodeSuiPrivateKey,
	PRIVATE_KEY_SIZE,
} from '@mysten/sui.js/cryptography';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { Networks, ResponseCode } from '@walless/core';
import { encryptWithPasscode } from '@walless/crypto';
import { utils } from '@walless/network';
import type {
	Migration,
	PrivateKeyDocument,
	PublicKeyDocument,
} from '@walless/store';
import { selectors } from '@walless/store';
import { encode } from 'bs58';
import { showRequirePasscodeModal } from 'modals/RequirePasscode';

export const appMigrations: Migration[] = [
	{
		version: 3,
		scope: 'app',
		description: 'Update Sui publickey document',
		migrate: async ({ storage }) => {
			showRequirePasscodeModal({
				title: 'Required Migration',
				desc: 'Require passcode to update your Sui data to new version',
				onPasscodeComplete: async (passcode) => {
					let privateKey;
					try {
						privateKey = await utils.getPrivateKey(
							storage,
							Networks.sui,
							passcode,
						);
					} catch {
						return {
							responseCode: ResponseCode.WRONG_PASSCODE,
						};
					}

					try {
						const privateKeyString = encodeSuiPrivateKey(
							privateKey.slice(0, PRIVATE_KEY_SIZE),
							'ED25519',
						);
						const suiSecretKey =
							decodeSuiPrivateKey(privateKeyString).secretKey;
						const keypair = Ed25519Keypair.fromSecretKey(suiSecretKey);
						const publicKey = keypair.getPublicKey();
						const encodedPublicKey = encode(publicKey.toRawBytes());
						const {
							docs: [suiPublicKeyDoc],
						} = await storage.find<PublicKeyDocument>(selectors.suiKeys);
						const encrypted = await encryptWithPasscode(passcode, suiSecretKey);
						await storage.upsert<PrivateKeyDocument>(
							suiPublicKeyDoc.privateKeyId,
							async (doc) => {
								doc = Object.assign(doc, encrypted);
								return doc;
							},
						);
						await storage.upsert<PublicKeyDocument>(
							suiPublicKeyDoc._id,
							async (doc) => {
								doc = Object.assign(doc, { encodedPublicKey });
								return doc;
							},
						);
						return {}; // Returning empty object just to satisfy type of onPasscodeComplete
					} catch {
						return {
							responseCode: ResponseCode.ERROR,
							message: 'Unable to update data',
						};
					}
				},
			});
		},
	},
];
