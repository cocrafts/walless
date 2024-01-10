import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight, Plus } from '@walless/icons';

import Item from './Item';

interface Props {
	style?: ViewStyle;
	onSendPress?: () => void;
	onReceivePress?: () => void;
	onBuyPress?: () => void;
}

export const FeatureButtons: FC<Props> = ({
	style,
	onSendPress,
	onReceivePress,
	onBuyPress,
}) => {
	return (
		<View style={[styles.container, style]}>
			<Item title="Send" size={buttonSize} onPress={onSendPress}>
				<ArrowTopRight size={iconSize} />
			</Item>

			<Item title="Receive" size={buttonSize} onPress={onReceivePress}>
				<ArrowBottomRight size={iconSize} />
			</Item>

			<Item title="Buy" size={buttonSize} onPress={onBuyPress}>
				<Plus size={iconSize} />
			</Item>
		</View>
	);
};

export default FeatureButtons;

const buttonSize = 38;
const iconSize = 18;
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 18,
	},
});
