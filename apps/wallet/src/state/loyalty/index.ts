import type { Task } from '@walless/graphql';
import { proxy } from 'valtio';

interface LoyaltyState {
	taskMap: Record<string, Task>;
}

export const loyaltyState = proxy<LoyaltyState>({
	taskMap: {},
});
