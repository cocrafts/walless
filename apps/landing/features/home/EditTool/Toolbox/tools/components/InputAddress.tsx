import { type FC, useState } from 'react';
import {
	type NativeSyntheticEvent,
	type TextInputKeyPressEventData,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import { Plus } from '@walless/icons';
import { Button } from '@walless/ui';

interface Props {
	address?: string;
	onSubmit: (value: string) => Promise<void>;
}

const InputAddress: FC<Props> = ({ address = '', onSubmit }) => {
	const [value, setValue] = useState(address);

	const handleSubmit = async () => {
		setValue((value) => `Loading... ${value}`);
		await onSubmit(value);
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
				placeholder={'Enter address'}
				placeholderTextColor={'#566674'}
			/>
			<Button style={styles.buttonContainer} onPress={handleSubmit}>
				<Plus size={18} color={'#566674'} />
			</Button>
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
		padding: 10,
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
	},
});
