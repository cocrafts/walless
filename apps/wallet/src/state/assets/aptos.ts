import type { AptosPendingToken } from '@walless/core';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface AptosState {
	directTransfer: boolean;
	pendingTokens: Map<string, AptosPendingToken>;
}

export const aptosState = proxy<AptosState>({
	directTransfer: false,
	pendingTokens: proxyMap(),
});
