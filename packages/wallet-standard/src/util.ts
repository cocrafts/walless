import { Ed25519PublicKey as SuiPublicKey } from '@mysten/sui.js';
import { PublicKey as SolanaPublicKey } from '@solana/web3.js';
export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
	return arraysEqual(a, b);
}

interface Indexed<T> {
	length: number;

	[index: number]: T;
}

export function arraysEqual<T>(a: Indexed<T>, b: Indexed<T>): boolean {
	if (a === b) return true;

	const length = a.length;
	if (length !== b.length) return false;

	for (let i = 0; i < length; i++) {
		if (a[i] !== b[i]) return false;
	}

	return true;
}

// Namespace for SUI
export const SuiSignMessage = 'sui:signMessage';
export const SuiSignTransactionBlock = 'sui:signTransactionBlock';
export const SuiSignAndExecuteTransactionBlock =
	'sui:signAndExecuteTransactionBlock';

export type PublicKeyType = SuiPublicKey | SolanaPublicKey;
