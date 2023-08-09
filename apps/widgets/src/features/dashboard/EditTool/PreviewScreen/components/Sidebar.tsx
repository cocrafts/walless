import type { FC, ReactNode } from 'react';
import { View } from '@walless/gui';

interface Props {
	children?: ReactNode;
}

const Sidebar: FC<Props> = ({ children }) => {
	return (
		<View
			style={{
				minHeight: 648,
				width: 60,
				borderRightWidth: 1,
				borderColor: '#364654',
				paddingVertical: 20,
			}}
		>
			{children}
		</View>
	);
};

export default Sidebar;
