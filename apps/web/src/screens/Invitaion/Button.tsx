import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@walless/gui';

interface Props {
	content: string;
	isValid?: boolean;
	onPress?: () => void;
}

const Button: FC<Props> = ({ content, isValid, onPress }) => {
	const backgroundColor = {
		backgroundColor: isValid ? '#0694D3' : '#223240',
	};

	return (
		<TouchableOpacity
			style={[styles.container, backgroundColor]}
			onPress={onPress}
		>
			<Text>{content}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 342,
		height: 48,
		borderRadius: 16,
	},
});

export default Button;
