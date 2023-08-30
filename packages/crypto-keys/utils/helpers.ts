import { Networks } from '@walless/core';

import type { Prefix } from './types';

export const defaultPrefixDerivationPaths: Prefix[] = [
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
