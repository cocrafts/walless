import { Networks } from '@walless/core';
import { decryptWithPasscode } from '@walless/crypto';
import { modules } from '@walless/ioc';
import { RequestType } from '@walless/messaging';
import type { PrivateKeyDocument, PublicKeyDocument } from '@walless/store';

export const settings = {
	requirePasscode: true,
};

export const triggerActionToGetPrivateKey = async () => {
	return '';
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

export const triggerActionToGetPrivateKey = async () => {
	console.log('bug');
	return Uint8Array.from([1, 2, 3]);
};
