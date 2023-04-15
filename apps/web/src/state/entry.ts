import { initializeWalletState } from './wallet';

export const initializeStates = async () => {
	await Promise.all([initializeWalletState()]);
};
