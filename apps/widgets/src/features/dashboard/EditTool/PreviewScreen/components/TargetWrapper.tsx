import type { FC, ReactNode } from 'react';
import { View } from '@walless/gui';

interface Props {
	children: ReactNode;
	isTargeted: boolean;
	zIndex?: number;
}

const TargetWrapper: FC<Props> = ({ children, isTargeted, zIndex = 9 }) => {
	return (
		<View>
			<View
				style={{
					// position: 'absolute',
					// top: 0,
					// left: 0,
					zIndex: zIndex,
					// width: '100%',
					// height: '100%',
					borderRadius: 8,
					backgroundColor: isTargeted ? 'rgb(6, 148, 211, 0.7)' : 'transparent',
				}}
			/>
			{children}
		</View>
	);
};

export default TargetWrapper;
