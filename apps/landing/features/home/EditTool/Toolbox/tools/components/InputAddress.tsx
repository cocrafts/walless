import { type FC, useState } from 'react';
import {
	type NativeSyntheticEvent,
	type TextInputKeyPressEventData,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Plus } from '@walless/icons';

interface Props {
	address?: string;
	onSubmit: (value: string) => void;
}

const InputAddress: FC<Props> = ({ address = '', onSubmit }) => {
	const [value, setValue] = useState(address);

	const handleSubmit = () => {
		onSubmit(value);
		setValue('');
	};

	const handleKeyPress = ({
		nativeEvent,
	}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
		if (nativeEvent.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.inputContainer}
				value={value}
				onKeyPress={handleKeyPress}
				onChangeText={(text) => setValue(text)}
			/>
			<TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
				<Plus size={18} color={'#566674'} />
			</TouchableOpacity>
		</View>
	);
};

export default InputAddress;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#19232C',
		borderRadius: 8,
	},
	inputContainer: {
		flex: 1,
		minWidth: 0,
		paddingHorizontal: 14,
		paddingVertical: 14,
		fontFamily: 'Rubik',
	},
	buttonContainer: {
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		paddingHorizontal: 10,
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
	},
});
