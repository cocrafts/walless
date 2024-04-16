import type { Progress } from '@walless/graphql';

import { loyaltyState } from './internal';

export const loyaltyActions = {
	setProgress: (progress: Progress) => {
		loyaltyState.progress = progress;
	},
};

export * from './internal';
