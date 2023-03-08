import { describe, test } from '@jest/globals';
import { Keypair } from '@solana/web3.js';

import SolanaNet from '../src/solana-net';
import SuiNet from '../src/sui-net';
import { convertStringToUin8Array } from '../src/utils/convert';

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

describe('fake test', () => {
	test('this should be always fine, replace this with real test case once you have it', async () => {
		try {
			const privateKey =
				'355e86993ccd81c04e126af03d7cd8a0e899875dd45ae63193de07988f8e669745023f4b28f2461e7b480b65f48a5a42174a4fb471c3d13cd3284900384a745c';
			const keypair = Keypair.fromSecretKey(
				convertStringToUin8Array(privateKey),
			);
			console.log(
				await SolanaNet.queryAllByAddress(keypair.publicKey.toString()),
			);
		} catch (e) {
			console.log(e);
		}
	});
});
