import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { SolanaToken } from '@walless/core';
import { runtime } from '@walless/core';
import { SwipeDownGesture } from '@walless/gui';
import type { TokenDocumentV2 } from '@walless/store';
import TokenList from 'features/Widget/BuiltInNetwork/TokenList';
import { useSafeAreaInsets, useSnapshot, useTokens } from 'utils/hooks';

import { swapActions, swapContext } from '../context';

import SearchBar from './SearchBar';
import SelectModalHeader from './SelectModalHeader';

const SelectFromToken: FC = () => {
	const insets = useSafeAreaInsets();
	const [searchText, setSearchText] = useState('');
	const { network, fromToken } = useSnapshot(swapContext).swap;
	const { tokens } = useTokens<SolanaToken>(network);

	const filteredTokens = useMemo(() => {
		const s = searchText.toLowerCase();
		return tokens.filter((t) => {
			const isSearchInMint = t.mint.toLowerCase().includes(s);
			const isSearchInName = t.name.toLowerCase().includes(s);
			const isSearchInSymbol = t.symbol?.toLowerCase().includes(s);

			return isSearchInMint || isSearchInName || isSearchInSymbol;
		});
	}, [searchText]);

	const handleBack = () => {
		swapActions.closeSelectToken('from');
	};

	const handleSelectToken = (token: TokenDocumentV2<SolanaToken>) => {
		if (token._id !== fromToken?._id) {
			swapActions.update({ fromToken: token, amount: '' });
		}
		swapActions.closeSelectToken('from');
	};

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
			<SelectModalHeader onBack={handleBack} />

			<SearchBar
				value={searchText}
				setValue={setSearchText}
				placeholder="Search by token or paste address"
			/>

			<TokenList
				itemStyle={styles.tokenStyle}
				separateStyle={styles.separateLineStyle}
				items={filteredTokens}
				onPressItem={handleSelectToken}
			/>
		</SwipeDownGesture>
	);
};

export default SelectFromToken;

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
	tokenStyle: {
		paddingHorizontal: 0,
	},
	separateLineStyle: {
		paddingHorizontal: 0,
	},
});
