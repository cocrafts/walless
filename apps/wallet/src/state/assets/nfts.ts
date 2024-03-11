import type { CollectionDocument, NftDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

interface NftState {
	map: Map<string, NftDocument>;
}

export const nftState = proxy<NftState>({
	map: proxyMap(),
});

interface CollectionState {
	map: Map<string, CollectionDocument>;
}

export const collectionState = proxy<CollectionState>({
	map: proxyMap(),
});
