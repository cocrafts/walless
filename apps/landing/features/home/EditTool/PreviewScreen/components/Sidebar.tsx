import { FC, ReactNode } from 'react';
import { Stack } from '@walless/ui';

interface Props {
	children?: ReactNode;
}

const Sidebar: FC<Props> = ({ children }) => {
	return (
		<Stack
			minHeight={648}
			width={60}
			borderRightWidth={1}
			borderColor="#364654"
		>
			{children}
		</Stack>
	);
};

export default Sidebar;
