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
					Explore the world&apos;s {'\n'} custom design layout
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
		paddingTop: 20,
		marginHorizontal: 15,
		backgroundColor: '#19232C',
	},
	titleContainer: {
		justifyContent: 'center',
		marginBottom: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: '500',
		textAlign: 'center',
	},
	searchBar: {
		marginVertical: 10,
		backgroundColor: '#23303C',
	},
});
