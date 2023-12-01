import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { InputProps } from '@walless/gui';
import { Input, View } from '@walless/gui';
import { Search, Times } from '@walless/icons';

type Props = InputProps & {
	iconSize?: number;
	iconColor?: string;
	onChangeSearch?: (query: string) => void;
	onPressSearch?: (query: string) => void;
};

export const SearchBar: FC<Props> = ({
	style,
	focusStyle,
	inputStyle,
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

	const handleClearSearchPress = () => {
		setTextSearch('');
		onChangeSearch?.('');
	};

	const prefix = (
		<TouchableOpacity
			style={styles.prefix}
			hitSlop={15}
			onPress={handleSearchPress}
		>
			<Search size={iconSize} color={iconColor} />
		</TouchableOpacity>
	);

	const suffix = textSearch && (
		<TouchableOpacity onPress={handleClearSearchPress}>
			<Times size={iconSize} color={iconColor} />
		</TouchableOpacity>
	);

	return (
		<View style={style}>
			<Input
				prefix={prefix}
				suffix={suffix}
				style={[styles.inputContainer, inputStyle]}
				focusStyle={focusStyle}
				inputStyle={styles.input}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				value={textSearch}
				onChangeText={(text) => {
					setTextSearch(text);
					onChangeSearch?.(text);
				}}
			/>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		borderRadius: 10,
	},
	prefix: {
		padding: 12,
	},
	input: {
		fontSize: 15,
		paddingVertical: 10,
		paddingLeft: 0,
	},
});
