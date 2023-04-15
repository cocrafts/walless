import { FC } from 'react';
import { Stack, StackProps } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight, Cart, Swap } from '@walless/icons';

import FeatureButton from '../components/FeatureButton';

type Props = StackProps & {
	gap?: number;
	iconSize?: number;
	onSendPress?: () => void;
	onReceivePress?: () => void;
	onBuyPress?: () => void;
	onSwapPress?: () => void;
};

export const MainFeatures: FC<Props> = ({
	gap = 18,
	iconSize = 18,
	onSendPress,
	onReceivePress,
	onBuyPress,
	onSwapPress,
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
			<FeatureButton title="Buy" onPress={onBuyPress}>
				<Cart size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Swap" onPress={onSwapPress}>
				<Swap size={iconSize} />
			</FeatureButton>
		</Stack>
	);
};

export default MainFeatures;
