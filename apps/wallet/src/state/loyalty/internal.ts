import type { Progress } from '@walless/graphql';
import { proxy } from 'valtio';

export interface LoyaltyState {
	progress?: Progress;
}

export const loyaltyState = proxy<LoyaltyState>({});
