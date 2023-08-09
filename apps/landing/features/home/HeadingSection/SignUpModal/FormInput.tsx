import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Text, View } from '@walless/gui';

interface Props {
	title: string;
	placeholder: string;
	onChangeText: (text: string) => void;
}

const FormInput: FC<Props> = ({ title, placeholder, onChangeText }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Input
				style={styles.inputContainer}
				placeholder={placeholder}
				onChangeText={(text) => onChangeText(text)}
			/>
		</View>
	);
};

export default FormInput;

const styles = StyleSheet.create({
	container: {
		gap: 6,
	},
	title: {
		color: '#566674',
	},
	inputContainer: {
		backgroundColor: '#0E141A',
	},
});
