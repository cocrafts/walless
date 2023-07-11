import type { FC } from 'react';
import { Button, Text } from '@walless/ui';

interface Props {
	name: string;
	isActive: boolean;
	onPress: () => void;
}

const ToolName: FC<Props> = ({ name, isActive, onPress }) => {
	return (
		<Button
			width={100}
			backgroundColor="transparent"
			padding={0}
			paddingHorizontal={0}
			paddingVertical={20}
			alignItems="flex-start"
			onPress={onPress}
		>
			<Text fontSize={16} color={isActive ? 'white' : '#566674'}>
				{name}
			</Text>
		</Button>
	);
};

export default ToolName;
