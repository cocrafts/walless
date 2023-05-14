import { type ExtensionDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface ExtensionState {
	map: Map<string, ExtensionDocument>;
}

export const extensionState = proxy<ExtensionState>({
	map: proxyMap(),
});
