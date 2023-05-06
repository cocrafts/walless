import { FC } from 'react';
import { Text } from '@walless/ui';

interface Props {
	name: string;
	isActive: boolean;
	onPress: () => void;
}

const ToolName: FC<Props> = ({ name, isActive, onPress }) => {
	return (
		<Text
			width={100}
			paddingVertical={20}
			fontSize={16}
			color={isActive ? 'white' : '#566674'}
			cursor="pointer"
			onPress={onPress}
		>
			{name}
		</Text>
	);
};

export default ToolName;
