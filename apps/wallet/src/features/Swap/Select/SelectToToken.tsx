import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import type { JupiterToken } from 'utils/hooks';
import { useJupiterContext } from 'utils/hooks';

import { swapActions } from '../context';

import SearchBar from './SearchBar';
import ToToken from './ToToken';

const SelectToToken: FC = () => {
	const [searchText, setSearchText] = useState('');
	const handleBack = () => {
		swapActions.closeSelectToken('to');
	};

	const { tokens } = useJupiterContext();
	const filteredTokens = useMemo(() => {
		const search = searchText.toLowerCase();
		return tokens.filter((t) => {
			return (
				t.address.toLowerCase().includes(search) ||
				t.name.toLowerCase().includes(search) ||
				t.symbol.toLowerCase().includes(search)
			);
		});
	}, [tokens, searchText]);

	const renderToken: ListRenderItem<JupiterToken> = useCallback(({ item }) => {
		const handleSelectToken = () => {
			swapActions.update({ toToken: item });
			swapActions.closeSelectToken('to');
		};

		return (
			<ToToken
				name={item.name}
				symbol={item.symbol}
				logoURI={item.logoURI}
				onPress={handleSelectToken}
			/>
		);
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Select a token</Text>
				<Button style={styles.backButton} onPress={handleBack}>
					<ChevronLeft />
				</Button>
			</View>

			<SearchBar
				value={searchText}
				setValue={setSearchText}
				placeholder="Search by token or paste address"
			/>

			{tokens.length === 0 ? (
				<ActivityIndicator style={styles.loading} />
			) : (
				<FlatList
					style={styles.tokensContainer}
					data={filteredTokens}
					renderItem={renderToken}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
				/>
			)}
		</View>
	);
};

export default SelectToToken;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#131C24',
		paddingTop: 10,
		paddingBottom: 28,
		paddingHorizontal: 28,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		gap: 12,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		color: '#FFFFFF',
		fontWeight: '500',
		fontSize: 20,
	},
	backButton: {
		backgroundColor: 'transparent',
		paddingHorizontal: 0,
	},
	loading: {
		marginTop: 50,
		alignSelf: 'center',
	},
	tokensContainer: {
		flex: 1,
	},
	separator: {
		height: 1,
		backgroundColor: '#5666746a',
	},
});
