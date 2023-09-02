import type { CollectibleDocument, CollectionDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

interface CollectibleState {
	map: Map<string, CollectibleDocument>;
}

export const collectibleState = proxy<CollectibleState>({
	map: proxyMap(),
});

interface CollectionState {
	map: Map<string, CollectionDocument>;
}

export const collectionState = proxy<CollectionState>({
	map: proxyMap(),
});
