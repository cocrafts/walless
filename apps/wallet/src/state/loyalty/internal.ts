import type { Action, UserProgress } from '@walless/graphql';
import { proxy } from 'valtio';

export interface LoyaltyState {
	userProgress?: UserProgress;
	wallessActions: Action[];
	partnerActionMap: Map<string, Action[]>;
}

export const loyaltyState = proxy<LoyaltyState>({
	wallessActions: [],
	partnerActionMap: new Map(),
});
