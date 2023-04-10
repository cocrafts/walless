import { ReactNode } from 'react';
import { StackProps } from '@tamagui/core';

export type LayoutProps = StackProps & {
	children: ReactNode;
};
