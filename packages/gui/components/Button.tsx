import type { FC, ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import Hoverable from './Hoverable';

interface Props {
	style?: StyleProp<ViewStyle>;
	children?: ReactNode;
	title?: string;
	titleStyle?: StyleProp<TextStyle>;
	onPress?: () => void;
	outline?: boolean;
	transparent?: boolean;
	disabled?: boolean;
}

export const Button: FC<Props> = ({
	style,
	children,
	title,
	titleStyle,
	onPress,
	outline,
	transparent,
	disabled,
}) => {
	const containerStyle = [
		styles.container,
		outline && styles.outlineContainer,
		transparent && styles.transparentContainer,
		disabled && styles.disabled,
		style,
	];

	return (
		<Hoverable
			noSelect
			disabled={disabled}
			style={containerStyle}
			onPress={onPress}
		>
			{children || <Text style={[styles.title, titleStyle]}>{title}</Text>}
		</Hoverable>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0694D3',
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderWidth: 1,
		borderRadius: 15,
		borderColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	outlineContainer: {
		backgroundColor: 'transparent',
		borderColor: 'rgba(255, 255, 255, 0.3)',
	},
	transparentContainer: {
		backgroundColor: 'transparent',
		paddingHorizontal: 0,
	},
	disabled: {
		backgroundColor: '#202D38',
	},
	title: {
		color: 'white',
	},
});
