import type { ReactNode } from 'react';
import type { StackProps } from '@tamagui/core';

export type LayoutProps = StackProps & {
	theme?: 'dark' | 'light';
	children: ReactNode;
};

export const imageSources = {
	wallessIcon: {
		uri: '/img/walless-icon.svg',
	},
	wallessText: {
		uri: '/img/walless-text.svg',
	},
};
