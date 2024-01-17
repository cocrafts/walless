import type { Networks } from '@walless/core';
import { decryptWithPasscode } from '@walless/crypto';
import type {
	Database,
	PrivateKeyDocument,
	PublicKeyDocument,
} from '@walless/store';

export const getPrivateKey = async (
	storage: Database,
	network: Networks,
	passcode: string,
) => {
	const result = await storage.find({
		selector: {
			type: 'PublicKey',
			network: network,
		},
	});
	const [publicKey] = result.docs as PublicKeyDocument[];
	const encryptedKey = await storage.safeGet<PrivateKeyDocument>(
		publicKey.privateKeyId,
	);

	return await decryptWithPasscode(passcode, encryptedKey as never);
};
