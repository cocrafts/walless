import { injectRuntime } from 'bridge/entry';
import { initializeLiveState } from 'state/live';
// import { initializeStorage } from 'utils/pouch';

export const initializeServices = async () => {
	await Promise.all([
		injectRuntime(),
		// initializeStorage(),
		initializeLiveState(),
	]);
};
