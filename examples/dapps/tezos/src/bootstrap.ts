import type { Network } from '@airgap/beacon-sdk';
import { ColorMode, DAppClient, NetworkType } from '@airgap/beacon-sdk';

import { updateContext } from './context';

export const network: Network = { type: NetworkType.MAINNET };
export const dAppClient = new DAppClient({
	name: 'Beacon Docs',
	preferredNetwork: network.type,
});
const theme = localStorage.getItem('theme');
await dAppClient.setColorMode(
	theme === 'dark' ? ColorMode.DARK : ColorMode.LIGHT,
);

const activeAccount = await dAppClient.getActiveAccount();
if (activeAccount) {
	console.log('Already connected:', activeAccount.address);
	updateContext({ address: activeAccount.address });
}

await dAppClient.clearActiveAccount();
