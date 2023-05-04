import { type FC } from 'react';
import { type ViewStyle, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';

import FeatureButton from '../components/FeatureButton';

interface Props {
	style?: ViewStyle;
	iconSize?: number;
	onSendPress?: () => void;
	onReceivePress?: () => void;
}

export const MainFeatures: FC<Props> = ({
	style,
	iconSize = 18,
	onSendPress,
	onReceivePress,
}) => {
	return (
		<View style={[styles.container, style]}>
			<FeatureButton title="Send" onPress={onSendPress}>
				<ArrowTopRight size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Receive" onPress={onReceivePress}>
				<ArrowBottomRight size={iconSize} />
			</FeatureButton>
		</View>
	);
};

export default MainFeatures;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 18,
	},
});
