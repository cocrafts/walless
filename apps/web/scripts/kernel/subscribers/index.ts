import { clearSolanaSubscriptions, subscribeSolanaChanges } from './solana';

interface Shared {
	cleanupTimeout?: number;
}

export const shared: Shared = {
	cleanupTimeout: undefined,
};

const startSubscriber = async () => {
	await Promise.all([subscribeSolanaChanges()]);

	console.log('subscriber started!');
};

const stopSubscriber = async () => {
	await Promise.all([clearSolanaSubscriptions()]);
	shared.cleanupTimeout = undefined;

	console.log('subscriber stopped!');
};

export const handleWalletOpen = async () => {
	if (shared.cleanupTimeout) {
		clearTimeout(shared.cleanupTimeout);
	} else {
		await startSubscriber();
	}
};

const awakeTime = 1000 * 60;
export const handleWalletClose = async () => {
	clearTimeout(shared.cleanupTimeout);
	shared.cleanupTimeout = setTimeout(stopSubscriber, awakeTime);
};
