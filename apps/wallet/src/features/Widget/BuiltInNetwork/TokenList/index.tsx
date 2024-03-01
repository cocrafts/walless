import type { ComponentType, FC, ReactElement } from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { FlatList } from 'react-native';
import type { TokenDocument } from '@walless/store';

import TokenItem from './Item';
import ListEmpty from './ListEmpty';
import Separator from './Separator';

interface Props {
	style?: StyleProp<ViewStyle>;
	itemStyle?: StyleProp<ViewStyle>;
	separateStyle?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	items: TokenDocument[];
	ListHeaderComponent?: ComponentType<TokenDocument> | ReactElement;
	onPressItem?: (item: TokenDocument) => void;
}

export const TokenList: FC<Props> = ({
	style,
	itemStyle,
	separateStyle,
	contentContainerStyle,
	items,
	ListHeaderComponent,
	onPressItem,
}) => {
	const renderItem: ListRenderItem<TokenDocument> = ({ item }) => {
		const handlePressItem = () => {
			onPressItem?.(item);
		};

		return (
			<TokenItem
				key={item._id}
				item={item}
				style={itemStyle}
				onPress={handlePressItem}
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
			ItemSeparatorComponent={() => <Separator style={separateStyle} />}
			ListEmptyComponent={ListEmpty}
		/>
	);
};

export default TokenList;
