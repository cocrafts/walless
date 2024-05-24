import type { UserProgress } from '@walless/graphql';

import { loyaltyState } from './internal';

export const loyaltyActions = {
	setUserProgress: (userProgress: UserProgress) => {
		loyaltyState.userProgress = userProgress;
	},
};

export * from './internal';
