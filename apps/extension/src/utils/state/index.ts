import { initializeCollectible } from './collectible';
import { initializeToken } from './token';

export const initializeState = async (): Promise<void> => {
	await Promise.all([initializeCollectible(), initializeToken()]);
};
