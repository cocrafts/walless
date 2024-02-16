import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from '@walless/gui';

interface Props {
	title: string;
	style?: ViewStyle;
	disabled?: boolean;
	onPress?: () => void;
}

export const NavButton: FC<Props> = ({ title, style, disabled, onPress }) => {
	const handlePress = () => {
		onPress && onPress();
	};

	return (
		<Button
			style={{ ...styles.button, ...style }}
			titleStyle={styles.title}
			title={title}
			disabled={disabled}
			onPress={handlePress}
		/>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 15,
		height: 48,
		marginTop: 'auto',
	},
	title: {
		fontSize: 14,
		fontWeight: '500',
		color: '#FFFFFF',
	},
});
