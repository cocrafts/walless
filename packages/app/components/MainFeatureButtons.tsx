import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { runtime } from '@walless/core';
import { View } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';

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
}) => {
	const buttonSize = runtime.isMobile ? 50 : 38;
	const innerIconSize = runtime.isMobile ? 20 : iconSize;

	return (
		<View style={[styles.container, style]}>
			<FeatureButton title="Send" size={buttonSize} onPress={onSendPress}>
				<ArrowTopRight size={innerIconSize} />
			</FeatureButton>
			<FeatureButton title="Receive" size={buttonSize} onPress={onReceivePress}>
				<ArrowBottomRight size={innerIconSize} />
			</FeatureButton>
			{/* <FeatureButton title="Buy" onPress={onBuyPress}>
				<Cart size={iconSize} />
			</FeatureButton> */}
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
