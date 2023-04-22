import { type FC } from 'react';
import {
	type ListRenderItem,
	type StyleProp,
	type ViewStyle,
	FlatList,
} from 'react-native';
import { type TokenDocument } from '@walless/store';

import TokenItem from './Item';

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
		return <TokenItem index={index} item={item} />;
	};

	return (
		<FlatList
			style={style}
			contentContainerStyle={contentContainerStyle}
			data={items}
			renderItem={renderItem}
		/>
	);
};

export default TokenList;
