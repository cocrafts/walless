import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from '@walless/gui';

interface Props {
	title: string;
	onPress?: () => void;
	style?: ViewStyle;
}

export const NavButton: FC<Props> = ({ title, onPress, style }) => {
	const handlePress = () => {
		onPress && onPress();
	};

	return (
		<Button
			style={{ ...styles.button, ...style }}
			titleStyle={styles.title}
			title={title}
			onPress={handlePress}
		/>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0694D3',
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
