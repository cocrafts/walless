import { confirmPasscode, setProfile, signInGoogle } from './authentication';
import { appState } from './internal';

export const appActions = {
	setProfile,
	signInGoogle,
	confirmPasscode,
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
};

export * from './internal';
