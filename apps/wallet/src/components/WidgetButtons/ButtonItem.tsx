import type { FC } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import type { IconProps } from '@walless/icons';

export interface WidgetButtonProps {
	style?: ViewStyle;
	title?: string;
	titleStyle?: TextStyle;
	Icon: FC<IconProps>;
	iconColor?: string;
	iconSize?: number;
	onPress?: () => void;
}

export const ButtonItem: FC<WidgetButtonProps> = ({
	Icon,
	iconColor,
	iconSize,
	onPress,
	style,
	title,
	titleStyle,
}) => {
	const innerStyle: ViewStyle = {
		width: 38,
		height: 38,
		borderRadius: 12,
		gap: 8,
		backgroundColor: onPress ? '#0694D3' : '#43525F',
		alignItems: 'center',
		justifyContent: 'center',
	};

	return (
		<View noSelect style={styles.container}>
			<Hoverable
				style={[innerStyle, style]}
				onPress={onPress}
				disabled={!onPress}
			>
				{<Icon color={iconColor} size={iconSize || 24} />}
			</Hoverable>
			{title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	innerContainer: {
		borderRadius: 12,
	},
	title: {
		color: '#4e5e6b',
		fontSize: 13,
		marginTop: 8,
	},
});
