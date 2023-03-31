import { FC } from 'react';
import { Stack } from '@walless/gui';

import { LayoutProps } from './shared';

export const HomeLayout: FC<LayoutProps> = ({ children }) => {
	return <Stack flex={1}>{children}</Stack>;
};

export default HomeLayout;
