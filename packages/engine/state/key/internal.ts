import type { PublicKeyDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface KeyState {
	map: Map<string, PublicKeyDocument>;
}

export const keyState = proxy<KeyState>({
	map: proxyMap(),
});
