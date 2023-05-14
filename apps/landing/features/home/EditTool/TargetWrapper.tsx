import { type FC, type ReactNode } from 'react';
import { Stack } from '@walless/ui';

interface Props {
	children: ReactNode;
	isTargeted: boolean;
	zIndex?: number;
}

const TargetWrapper: FC<Props> = ({ children, isTargeted, zIndex = 9 }) => {
	return (
		<Stack width="fit-content" height="fit-content">
			<Stack
				position="absolute"
				top={0}
				left={0}
				zIndex={zIndex}
				width="100%"
				height="100%"
				borderRadius={8}
				backgroundColor={isTargeted ? 'rgba(0, 0, 255, 0.25)' : 'transparent'}
			/>
			{children}
		</Stack>
	);
};

export default TargetWrapper;
