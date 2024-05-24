import type { UserProgress } from '@walless/graphql';
import { proxy } from 'valtio';

export interface LoyaltyState {
	userProgress?: UserProgress;
}

export const loyaltyState = proxy<LoyaltyState>({});
