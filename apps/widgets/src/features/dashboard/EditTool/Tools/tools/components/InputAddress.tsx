import type { FC } from 'react';
import { Fragment, useState } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
} from 'react-native';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Plus } from '@walless/icons';

interface Props {
	onSubmit: (address: string, tokenId?: number) => Promise<void>;
	withOptional?: boolean;
}

const InputAddress: FC<Props> = ({ onSubmit, withOptional }) => {
	const [address, setAddress] = useState('');
	const [tokenId, setTokenId] = useState<number>();

	const handleSubmit = async () => {
		setAddress((value) => `Loading... ${value}`);
		await onSubmit(address, tokenId);
		setAddress('');
		setTokenId(undefined);
	};

	const handleKeyPress = ({
		nativeEvent,
	}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
		if (nativeEvent.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<Fragment>
			<View style={styles.container}>
				<TextInput
					style={styles.inputContainer}
					value={address}
					onKeyPress={handleKeyPress}
					onChangeText={(text) => setAddress(text)}
					placeholder={'Enter address'}
					placeholderTextColor={'#566674'}
				/>
				<TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
					<Plus size={18} color={'#566674'} />
				</TouchableOpacity>
			</View>
			{withOptional && (
				<TextInput
					value={tokenId ? tokenId.toString() : ''}
					onChangeText={(text) => setTokenId(parseInt(text))}
					style={styles.tokenIdInputContainer}
					placeholder={'Enter token id (Optional)'}
					placeholderTextColor={'#566674'}
				/>
			)}
		</Fragment>
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
	tokenIdInputContainer: {
		backgroundColor: '#19232C',
		fontFamily: 'Rubik',
		borderRadius: 8,
		paddingHorizontal: 14,
		paddingVertical: 14,
	},
});
