import type { FC } from 'react';
import { useCallback, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Input, View } from '@walless/gui';
import { Search } from '@walless/icons';

interface Props {
	style?: ViewStyle;
	placeholder?: string;
	placeholderTextColor?: string;
	iconSize?: number;
	iconColor?: string;
	onChangeSearch?: (query: string) => void;
	onPressSearch?: (query: string) => void;
}

export const SearchBar: FC<Props> = ({
	style,
	placeholder = '',
	placeholderTextColor = '#000000',
	iconSize = 17,
	iconColor = '#566674',
	onChangeSearch,
	onPressSearch,
}) => {
	const [textSearch, setTextSearch] = useState('');

	const handleSearchPress = useCallback(() => {
		onPressSearch?.(textSearch);
	}, [textSearch]);

	const prefix = (
		<TouchableOpacity
			style={styles.prefix}
			hitSlop={15}
			onPress={handleSearchPress}
		>
			<Search size={iconSize} color={iconColor} />
		</TouchableOpacity>
	);

	return (
		<View horizontal style={[styles.container, style]}>
			<Input
				prefix={prefix}
				style={styles.inputContainer}
				inputStyle={styles.input}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				onChangeText={(text) => {
					setTextSearch(text);
					onChangeSearch?.(text);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#ffffff',
		borderRadius: 10,
	},
	inputContainer: {
		fontSize: 15,
		color: '#000000',
		flex: 1,
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		paddingRight: 12,
	},
	prefix: {
		padding: 12,
	},
	input: {
		// paddingHorizontal: 12,
	},
});
