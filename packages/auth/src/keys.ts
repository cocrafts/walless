import { Networks } from '@walless/core';

import { injectedModules } from './ioc';
import { SeedPhraseFormatType } from './w3a';

export const defaultPrefixDerivationPaths: Array<{
	path: string;
	network: Networks;
}> = [
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

export const initBySeedPhraseModule = async (passcode: string) => {
	let seedPhrases =
		await injectedModules.key.modules.seedPhraseModule.getSeedPhrases();
	if (seedPhrases.length === 0) {
		await injectedModules.key.modules.seedPhraseModule.setSeedPhrase(
			SeedPhraseFormatType.PRIMARY,
			'hello world from my friend and family you may love this journey',
		);
		seedPhrases =
			await injectedModules.key.modules.seedPhraseModule.getSeedPhrases();
	}
	console.log('init by seed phrase module', seedPhrases, passcode);
};

/**
 * @deprecated this method should be replaced by initBySeedPhrase
 */
export const initByPrivateKeyModule = async (passcode: string) => {
	console.log('init by private key module with passcode', passcode);
};
