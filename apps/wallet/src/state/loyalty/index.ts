import type { Action, UserProgress } from '@walless/graphql';

import { loyaltyState } from './internal';

export const loyaltyActions = {
	setUserProgress: (userProgress: UserProgress) => {
		loyaltyState.userProgress = userProgress;
	},
	setWallessActions: (actions: Action[]) => {
		loyaltyState.wallessActions = actions;
	},
	setPartnerActionMap: (map: Map<string, Action[]>) => {
		loyaltyState.partnerActionMap = map;
	},
};

export * from './internal';
