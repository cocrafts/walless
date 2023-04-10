import { ReactNode } from 'react';
import { StackProps } from '@tamagui/core';

export type LayoutProps = StackProps & {
	theme?: 'dark' | 'light';
	children: ReactNode;
};
