import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Platform, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight, Plus } from '@walless/icons';

import FeatureButton from '../components/FeatureButton';

interface Props {
	style?: ViewStyle;
	onSendPress?: () => void;
	onReceivePress?: () => void;
	onBuyPress?: () => void;
}

export const MainFeatureButtons: FC<Props> = ({
	style,
	onSendPress,
	onReceivePress,
	onBuyPress,
}) => {
	const buttonSize = Platform.select({
		default: 50,
		web: 38,
	});
	const iconSize = Platform.select({
		default: 20,
		web: 18,
	});

	return (
		<View style={[styles.container, style]}>
			{onSendPress && (
				<FeatureButton title="Send" size={buttonSize} onPress={onSendPress}>
					<ArrowTopRight size={iconSize} />
				</FeatureButton>
			)}
			{onReceivePress && (
				<FeatureButton
					title="Receive"
					size={buttonSize}
					onPress={onReceivePress}
				>
					<ArrowBottomRight size={iconSize} />
				</FeatureButton>
			)}

			<FeatureButton title="Buy" size={buttonSize} onPress={onBuyPress}>
				<Plus size={iconSize} />
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
