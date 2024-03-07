import type { ComponentType, FC, ReactElement } from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { FlatList } from 'react-native';
import type { TokenDocumentV2 } from '@walless/store';

import TokenItem from './Item';
import ListEmpty from './ListEmpty';
import Separator from './Separator';

interface Props {
	style?: StyleProp<ViewStyle>;
	itemStyle?: StyleProp<ViewStyle>;
	separateStyle?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	items: TokenDocumentV2[];
	ListHeaderComponent?: ComponentType<TokenDocumentV2> | ReactElement;
	onPressItem?: (item: TokenDocumentV2) => void;
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
	const renderItem: ListRenderItem<TokenDocumentV2> = ({ item }) => {
		const handlePressItem = () => {
			onPressItem?.(item);
		};

		return (
			<TokenItem
				key={item._id}
				token={item}
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
			keyExtractor={(item) => item._id}
			ItemSeparatorComponent={() => <Separator style={separateStyle} />}
			ListEmptyComponent={ListEmpty}
		/>
	);
};

export default TokenList;
