import {
	type CollectibleDocument,
	type CollectionDocument,
} from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

interface CollectiblesState {
	map: Map<string, CollectibleDocument>;
}

export const collectiblesState = proxy<CollectiblesState>({
	map: proxyMap(),
});

interface CollectionsState {
	map: Map<string, CollectionDocument>;
}

export const collectionsState = proxy<CollectionsState>({
	map: proxyMap(),
});
