import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import type { WidgetButtonProps } from './ButtonItem';
import { ButtonItem } from './ButtonItem';

interface Props {
	style?: ViewStyle;
	buttons: WidgetButtonProps[];
}

const WidgetButtons: FC<Props> = ({ style, buttons }) => {
	return (
		<View style={[styles.container, style]}>
			{buttons.map((item, idx) => (
				<ButtonItem
					key={idx}
					Icon={item.Icon}
					iconColor={item.iconColor}
					iconSize={item.iconSize}
					onPress={item.onPress}
					style={item.style}
					title={item.title}
					titleStyle={item.titleStyle}
				/>
			))}
		</View>
	);
};

export default WidgetButtons;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 18,
	},
});
