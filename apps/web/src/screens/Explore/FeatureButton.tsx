import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

interface Props {
	icon: React.NamedExoticComponent;
	handleClick: () => void;
}

const FeatureButton: FC<Props> = () => {
	return (
		<Stack>
			<Text>FeatureIcon</Text>
		</Stack>
	);
};

export default FeatureButton;
