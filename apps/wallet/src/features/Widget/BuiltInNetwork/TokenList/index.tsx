import type { ComponentType, ReactElement } from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { FlatList } from 'react-native';
import type { Token } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import TokenItem from './Item';
import ListEmpty from './ListEmpty';
import Separator from './Separator';

interface Props<T extends Token> {
	style?: StyleProp<ViewStyle>;
	itemStyle?: StyleProp<ViewStyle>;
	separateStyle?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	items: TokenDocument<T>[];
	ListHeaderComponent?: ComponentType<TokenDocument<T>> | ReactElement;
	onPressItem?: (item: TokenDocument<T>) => void;
}

export const TokenList = <T extends Token>({
	style,
	itemStyle,
	separateStyle,
	contentContainerStyle,
	items,
	ListHeaderComponent,
	onPressItem,
}: Props<T>) => {
	const renderItem: ListRenderItem<TokenDocument<T>> = ({ item }) => {
		const handlePressItem = () => {
			onPressItem?.(item);
		};

		return (
			<TokenItem
				key={item._id}
				token={item}
				style={itemStyle}
				onPress={handlePressItem}
				pnl={-5}
			/>
		);
	};

	return (
		<FlatList
			ListHeaderComponent={ListHeaderComponent}
			showsVerticalScrollIndicator={false}
			style={style}
			contentContainerStyle={contentContainerStyle}
			data={items}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			ItemSeparatorComponent={() => <Separator style={separateStyle} />}
			ListEmptyComponent={ListEmpty}
		/>
	);
};

export default TokenList;
