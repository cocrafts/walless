import { ReactElement } from 'react';
import { StackProps } from '@tamagui/core';

export type LayoutProps = StackProps & {
	children: ReactElement;
};
