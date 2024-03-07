import type { CollectionDocumentV2, NftDocumentV2 } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

interface NftState {
	map: Map<string, NftDocumentV2>;
}

export const nftState = proxy<NftState>({
	map: proxyMap(),
});

interface CollectionState {
	map: Map<string, CollectionDocumentV2>;
}

export const collectionState = proxy<CollectionState>({
	map: proxyMap(),
});
