import { TokenRecord, WalletRecord } from '@walless/storage';
import { db } from 'utils/storage';
import { proxy } from 'valtio';

export interface TokenState {
	wallets: WalletRecord[];
	tokens: TokenRecord[];
}

export const tokenState = proxy<TokenState>({
	wallets: [],
	tokens: [],
});

export const initializeToken = async (): Promise<void> => {
	tokenState.wallets = await db.wallets.toArray();
	tokenState.tokens = await db.tokens.toArray();
};
