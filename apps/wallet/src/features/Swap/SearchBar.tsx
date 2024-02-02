import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { View } from '@walless/gui';
import { Search } from '@walless/icons';

type Props = {
	value: string;
	setValue: (value: string) => void;
	placeholder?: string;
};

const SearchBar: FC<Props> = ({ value, setValue, placeholder }) => {
	const [focus, setFocus] = useState(false);

	return (
		<View style={[styles.container, focus && styles.focus]}>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={setValue}
				placeholder={placeholder}
				placeholderTextColor={'#798997'}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
			<Search size={18} color="#798997" />
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#5666746b',
		backgroundColor: '#1F2A34',
	},
	focus: {
		borderColor: '#566674',
	},
	input: {
		flex: 1,
		color: '#FFFFFF',
	},
});
