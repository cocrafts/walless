import { initializeCollectible } from './collectible';

export const initializeState = async (): Promise<void> => {
	await Promise.all([initializeCollectible()]);
};
