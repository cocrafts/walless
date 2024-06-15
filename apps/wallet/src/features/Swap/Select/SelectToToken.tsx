import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { ListRenderItem, ViewStyle } from 'react-native';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { runtime } from '@walless/core';
import { Button, SwipeDownGesture, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import assets from 'utils/assets';
import type { JupiterToken } from 'utils/hooks';
import { useJupiterContext, useSafeAreaInsets } from 'utils/hooks';

import { swapActions } from '../context';

import SearchBar from './SearchBar';
import ToToken from './ToToken';

const SelectToToken: FC = () => {
	const insets = useSafeAreaInsets();
	const [searchText, setSearchText] = useState('');
	const handleBack = () => {
		swapActions.closeSelectToken('to');
	};

	const { tokens, tokensLoading } = useJupiterContext();
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
				name={item.name === 'Wrapped SOL' ? 'SOL' : item.name}
				symbol={item.symbol}
				logoURI={item.logoURI}
				onPress={handleSelectToken}
			/>
		);
	}, []);

	const dynamicContainerStyle: ViewStyle = {
		marginTop: insets.top || 20,
		paddingBottom: insets.bottom,
	};

	return (
		<SwipeDownGesture
			style={[dynamicContainerStyle, styles.container]}
			callbackOnClose={handleBack}
			gestureEnable={runtime.isMobile}
		>
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

			{tokensLoading ? (
				<ActivityIndicator style={styles.loading} />
			) : tokens.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Image
						style={styles.emptyIcon}
						source={assets.misc.swapPlaceholder}
					/>
					<Text style={styles.emptyText}>
						There are no available tokens for the selected chain. It might be a
						network issue, please check your connection and try again
					</Text>
				</View>
			) : (
				<FlatList
					style={styles.tokensContainer}
					data={filteredTokens}
					renderItem={renderToken}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
				/>
			)}
		</SwipeDownGesture>
	);
};

export default SelectToToken;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#131C24',
		paddingTop: 10,
		paddingHorizontal: 18,
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
	emptyContainer: {
		marginTop: 40,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 40,
	},
	emptyIcon: {
		width: 105,
		height: 150,
	},
	emptyText: {
		color: '#566674',
		textAlign: 'center',
	},
	tokensContainer: {
		flex: 1,
	},
	separator: {
		height: 1,
		backgroundColor: '#5666746a',
	},
});
