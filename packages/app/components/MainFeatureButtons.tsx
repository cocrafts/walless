import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight, Cart } from '@walless/icons';

import FeatureButton from '../components/FeatureButton';

interface Props {
	style?: ViewStyle;
	iconSize?: number;
	onSendPress?: () => void;
	onReceivePress?: () => void;
	onBuyPress?: () => void;
}

export const MainFeatureButtons: FC<Props> = ({
	style,
	iconSize = 18,
	onSendPress,
	onReceivePress,
	onBuyPress,
}) => {
	return (
		<View style={[styles.container, style]}>
			<FeatureButton title="Send" onPress={onSendPress}>
				<ArrowTopRight size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Receive" onPress={onReceivePress}>
				<ArrowBottomRight size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Buy" onPress={onBuyPress}>
				<Cart size={iconSize} />
			</FeatureButton>
		</View>
	);
};

export default MainFeatureButtons;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 18,
	},
});
