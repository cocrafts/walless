import type { Networks } from './common';

export type PublicKey = {
	privateKeyId: string;
	network: Networks;
};

export type SuiPublicKey = PublicKey & {
	network: Networks.sui;
	encodedPublicKey: string;
};

export type TezosPublicKey = PublicKey & {
	meta: {
		publicKey: string;
		address: string;
	};
};
