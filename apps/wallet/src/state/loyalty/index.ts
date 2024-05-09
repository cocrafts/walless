import type { UserProgress } from '@walless/graphql';

import { loyaltyState } from './internal';

export const loyaltyActions = {
	setProgress: (progress: UserProgress) => {
		loyaltyState.userProgress = progress;
	},
};

export * from './internal';
