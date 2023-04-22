import { FC } from 'react';
import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';
import { Stack, StackProps } from '@walless/ui';

import FeatureButton from '../components/FeatureButton';

type Props = StackProps & {
	gap?: number;
	iconSize?: number;
	onSendPress?: () => void;
	onReceivePress?: () => void;
};

export const MainFeatures: FC<Props> = ({
	gap = 18,
	iconSize = 18,
	onSendPress,
	onReceivePress,
	...stackProps
}) => {
	return (
		<Stack horizontal gap={gap} {...stackProps}>
			<FeatureButton title="Send" onPress={onSendPress}>
				<ArrowTopRight size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Receive" onPress={onReceivePress}>
				<ArrowBottomRight size={iconSize} />
			</FeatureButton>
		</Stack>
	);
};

export default MainFeatures;
