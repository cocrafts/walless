import { ThemeState, themeState } from './internal';

const setTheme = (theme: ThemeState) => {
	Object.keys(theme).forEach((key) => {
		themeState[key as never] = theme[key as never];
	});
};

export const themeActions = {
	setTheme,
};

export * from './internal';
