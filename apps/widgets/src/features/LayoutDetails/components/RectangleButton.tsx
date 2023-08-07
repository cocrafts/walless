import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from '@walless/gui';

interface Props {
	title: string;
	onPress: () => void;
	backgroundColor?: string;
}

const RectangleButton: FC<Props> = ({
	title,
	onPress,
	backgroundColor = '#0694D3',
}) => {
	return (
		<Button
			style={{ ...styles.button, backgroundColor: backgroundColor }}
			onPress={onPress}
		>
			<Text style={styles.title}>{title}</Text>
		</Button>
	);
};

export default RectangleButton;

const styles = StyleSheet.create({
	button: {
		minWidth: 190,
		minHeight: 40,
		borderRadius: 8,
		alignSelf: 'flex-end',
	},
	title: {
		fontSize: 12,
		color: '#ffffff',
		textAlign: 'center',
	},
});
