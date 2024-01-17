import { Networks } from '@walless/core';
import { Network, Provider } from 'aptos';

import type { EngineConfig, Runner } from '../../types';

export type AptosContext = {
	provider: Provider;
};

export const aptosEndpoints: Record<string, Network> = {
	devnet: Network.DEVNET,
	testnet: Network.TESTNET,
	mainnet: Network.MAINNET,
};

export const createAptosRunner = (config: EngineConfig): Runner => {
	const provider = new Provider(
		aptosEndpoints[config.endpoints[Networks.aptos]],
	);

	return {
		start() {},
		stop() {},
		getContext: (): AptosContext => {
			return { provider };
		},
	};
};
