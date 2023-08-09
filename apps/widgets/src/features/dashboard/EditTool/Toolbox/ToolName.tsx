import type { FC } from 'react';
import { Button, Text } from '@walless/gui';

interface Props {
	name: string;
	isActive: boolean;
	onPress: () => void;
}

const ToolName: FC<Props> = ({ name, isActive, onPress }) => {
	return (
		<Button onPress={onPress}>
			<Text
				style={{
					fontSize: 16,
					color: isActive ? 'white' : '#566674',
				}}
			>
				{name}
			</Text>
		</Button>
	);
};

export default ToolName;
