import type { FC } from 'react';
import { Text } from '@walless/ui';

interface Props {
	onPress: () => void;
}

const SeeAllBtn: FC<Props> = ({ onPress }) => {
	return (
		<Text
			color="#566674"
			fontSize={12}
			paddingVertical={4}
			paddingHorizontal={8}
			borderWidth={1}
			borderColor="#56667433"
			borderRadius={8}
			onPress={onPress}
		>
			See All
		</Text>
	);
};

export default SeeAllBtn;
