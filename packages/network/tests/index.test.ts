import { describe, expect, test } from '@jest/globals';

import SolanaNet from '../src/solana-net';
import SuiNet from '../src/sui-net';

describe('fake test', () => {
	test('this should be always fine, replace this with real test case once you have it', async () => {
		console.log(
			await SuiNet.queryAllByAddress(
				'0xeb0793d2d4f5fb0da207a7f7d0c2ec02b8a0d04a',
			),
		);
	});
});

describe('fake test', () => {
	test('this should be always fine, replace this with real test case once you have it', async () => {
		console.log(
			await SolanaNet.queryAllByAddress(
				'D4zHiywS9ELy7pvFKjvsR3KNJxAvi72EqsmkUhVXG471',
			),
		);
	});
});
