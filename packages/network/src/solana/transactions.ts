import { Keypair } from '@solana/web3.js';
import { sign } from 'tweetnacl';

export const signMessage = (message: Uint8Array, privateKey: Uint8Array) => {
	const keypair = Keypair.fromSecretKey(privateKey);
	const signatureBytes = sign.detached(message, keypair.secretKey);
	return signatureBytes;
};
