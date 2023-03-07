import { describe, test } from '@jest/globals';

import SolanaNet from '../src/solana-net';
import SuiNet from '../src/sui-net';

import { solKey, suiKey } from './config';

describe('fake test', () => {
	test('this should be always fine, replace this with real test case once you have it', async () => {
		console.log(await SuiNet.queryAllByAddress(suiKey));
	});
});

describe('fake test', () => {
	test('this should be always fine, replace this with real test case once you have it', async () => {
		console.log(await SolanaNet.queryAllByAddress(solKey));
	});
});
