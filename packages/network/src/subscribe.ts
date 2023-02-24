import * as web3 from '@solana/web3.js';

import SolanaConnection from './connection';

export function subcribeWithPublicKeyString(
	publicKeyString: string,
	callback: web3.AccountChangeCallback,
) {
	return SolanaConnection.getConnection().onAccountChange(
		new web3.PublicKey(publicKeyString),
		callback,
	);
}

export function unSubcribe(connectionId: number) {
	SolanaConnection.getConnection().removeAccountChangeListener(connectionId);
}
