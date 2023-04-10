import { createTheme } from '@tamagui/core';

import { tokens } from './internal';

export const darkTheme = createTheme({
	background: tokens.color.primary,
	color: tokens.color.text,
});

export const lightTheme = createTheme({
	background: '#ffffff',
	color: '#222222',
});

export const themes = {
	dark: darkTheme,
	light: lightTheme,
};
