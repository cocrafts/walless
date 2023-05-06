import { type FC } from 'react';
import {
	type ListRenderItem,
	type StyleProp,
	type ViewStyle,
	FlatList,
} from 'react-native';
import { type TokenDocument } from '@walless/store';
import { useSnapshot } from 'valtio';

import { tokenListState } from '../../state/tokenList';

import TokenItem from './Item';
import Separator from './Separator';

interface Props {
	style?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
}

export const TokenList: FC<Props> = ({ style, contentContainerStyle }) => {
	const { tokens } = useSnapshot(tokenListState);

	const renderItem: ListRenderItem<TokenDocument> = ({ item, index }) => {
		return <TokenItem index={index} item={item} />;
	};

	return (
		<FlatList
			style={style}
			contentContainerStyle={contentContainerStyle}
			data={tokens as TokenDocument[]}
			renderItem={renderItem}
			ItemSeparatorComponent={Separator}
		/>
	);
};

export default TokenList;
