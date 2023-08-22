import type { FC } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputFocusEventData,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Input, Text, View } from '@walless/gui';

interface Props {
	title: string;
	placeholder: string;
	text: string;
	onChangeText: (text: string) => void;
	onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	error?: string;
}

const FormInput: FC<Props> = ({
	title,
	placeholder,
	text,
	onChangeText,
	error,
	onFocus,
	onBlur,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Input
				value={text}
				style={styles.inputContainer}
				placeholder={placeholder}
				onChangeText={(text) => onChangeText(text)}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			<Text style={styles.error}>{error}</Text>
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
	error: {
		marginLeft: 'auto',
		color: '#F04438',
		lineHeight: 14,
		height: 14,
	},
});
