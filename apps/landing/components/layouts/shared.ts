import { ReactElement } from 'react';
import { StackProps } from '@tamagui/core';

export type LayoutProps = StackProps & {
	children: ReactElement;
};

export const imageSources = {
	wallessIcon: {
		uri: '/img/walless-icon.png',
	},
	wallessText: {
		uri: '/img/walless-text.png',
	},
};
