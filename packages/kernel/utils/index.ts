import type { Networks } from '@walless/core';
import { decryptWithPasscode } from '@walless/crypto';
import { modules } from '@walless/ioc';
import type { PrivateKeyDocument, PublicKeyDocument } from '@walless/store';

export const settings = {
	requirePasscode: true,
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
