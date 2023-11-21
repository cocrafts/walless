import type { FC } from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

import { SearchBar } from './SearchBar';

type Props = {
	onChangeSearch: (query: string) => void;
} & ViewProps;

export const SearchHeader: FC<Props> = ({ onChangeSearch, ...otherProps }) => {
	return (
		<View style={styles.container} {...otherProps}>
			<View horizontal style={styles.titleContainer}>
				<Text style={styles.title}>
					Explore the world&apos;s custom desing layout
				</Text>
			</View>
			<SearchBar
				style={styles.searchBar}
				placeholder="Search"
				placeholderTextColor="#566674"
				onChangeSearch={onChangeSearch}
			/>
		</View>
	);
};

export default SearchHeader;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 15,
		backgroundColor: '#19232C',
	},
	titleContainer: {
		justifyContent: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		textAlign: 'center',
		maxWidth: 200,
	},
	searchBar: {
		marginVertical: 10,
		backgroundColor: '#23303C',
	},
});
