import { Networks } from '@walless/core';
import { decryptWithPasscode } from '@walless/crypto';
import { modules } from '@walless/ioc';
import { RequestType } from '@walless/messaging';
import { type PrivateKeyRecord } from '@walless/storage';
import {
	type PrivateKeyDocument,
	type PublicKeyDocument,
	selectors,
} from '@walless/store';

export const settings = {
	requirePasscode: true,
};

export const triggerActionToGetPrivateKey = async () => {
	try {
		const response = await modules.storage.find(selectors.solanaKeys);
		const [publicKey] = response.docs as PublicKeyDocument[];
		const encryptedKey = await modules.storage.safeGet<PrivateKeyDocument>(
			publicKey.privateKeyId,
		);

		return await decryptWithPasscode(
			'111111',
			encryptedKey as PrivateKeyRecord,
		);
	} catch (error) {
		console.log('Get private key error');
		console.log((error as Error).message);
		return null;
	}
};

export const getPrivateKey = async (network: Networks, passcode: string) => {
	const result = await modules.storage.find({
		selector: {
			type: 'PublicKey',
			network: network,
		},
	});
	const [publicKey] = result.docs as PublicKeyDocument[];
	const encryptedKey = await modules.storage.safeGet<PrivateKeyDocument>(
		publicKey.privateKeyId,
	);

	return await decryptWithPasscode(passcode, encryptedKey as never);
};

export const getNetwork = (requestType: RequestType) => {
	const typeName = RequestType[requestType];
	if (typeName.includes('ON_SOLANA')) return Networks.solana;
	else if (typeName.includes('ON_SUI')) return Networks.sui;
};
