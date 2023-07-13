import { type FC } from 'react';
import {
	type ListRenderItem,
	type StyleProp,
	type ViewStyle,
	FlatList,
	StyleSheet,
} from 'react-native';
import { type TokenDocument } from '@walless/store';

import TokenItem from './Item';
import ListEmpty from './ListEmpty';
import Separator from './Separator';

interface Props {
	style?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	items: TokenDocument[];
}

export const TokenList: FC<Props> = ({
	style,
	contentContainerStyle,
	items,
}) => {
	const renderItem: ListRenderItem<TokenDocument> = ({ item, index }) => {
		const isFirst = index === 0;
		const isLast = index === items.length - 1;

		return (
			<TokenItem
				index={index}
				item={item}
				style={[isFirst && styles.firstItem, isLast && styles.lastItem]}
			/>
		);
	};

	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			style={style}
			contentContainerStyle={contentContainerStyle}
			data={items}
			renderItem={renderItem}
			ItemSeparatorComponent={Separator}
			ListEmptyComponent={ListEmpty}
		/>
	);
};

export default TokenList;

const styles = StyleSheet.create({
	firstItem: {
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	lastItem: {
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
	},
});
