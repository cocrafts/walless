import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@walless/gui';

interface Props {
	title: string;
	onPress?: () => void;
}

export const NavButton: FC<Props> = ({ title, onPress }) => {
	const handlePress = () => {
		onPress && onPress();
	};

	return (
		<Button
			style={styles.button}
			titleStyle={styles.title}
			title={title}
			onPress={handlePress}
		/>
	);
};

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0694D3',
		borderRadius: 15,
		height: 48,
		width: 336,
		marginTop: 'auto',
	},
	title: {
		fontSize: 14,
		fontWeight: '500',
		color: '#FFFFFF',
	},
});
