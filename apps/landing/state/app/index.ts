import { appState } from './internal';

export const appActions = {
	increaseCounter: (volume = 1) => {
		appState.counter += volume;
	},
};

export * from './internal';
