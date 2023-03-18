import { CollectibleRecord } from '@walless/storage';
import { db } from 'utils/storage';
import { proxy } from 'valtio';

export interface CollectibleState {
	items: CollectibleRecord[];
}

export const collectibleState = proxy<CollectibleState>({
	items: [],
});

export const initializeCollectible = async (): Promise<void> => {
	collectibleState.items = await db.collectibles.toArray();
};
