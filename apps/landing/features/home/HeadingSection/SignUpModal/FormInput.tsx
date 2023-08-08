import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Text, View } from '@walless/gui';

interface Props {
	title: string;
	placeholder: string;
}

const FormInput: FC<Props> = ({ title, placeholder }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Input style={styles.inputContainer} placeholder={placeholder} />
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
