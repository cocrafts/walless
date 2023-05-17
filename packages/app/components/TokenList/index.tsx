import { type FC, useEffect } from 'react';
import {
	type ListRenderItem,
	type StyleProp,
	type ViewStyle,
	FlatList,
	StyleSheet,
} from 'react-native';
import { type TokenDocument } from '@walless/store';
import { useSnapshot } from 'valtio';

import { tokenListState } from '../../state/tokenList';

import TokenItem from './Item';
import Separator from './Separator';

interface Props {
	style?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	items?: TokenDocument[];
}

export const TokenList: FC<Props> = ({
	style,
	contentContainerStyle,
	items,
}) => {
	const { tokens } = useSnapshot(tokenListState);
	const tokensList: TokenDocument[] = [];

	const renderItem: ListRenderItem<TokenDocument> = ({ item, index }) => {
		const isFirst = index === 0;
		const lastIndex = items ? items.length - 1 : tokens.size - 1;
		const isLast = index === lastIndex;

		return (
			<TokenItem
				index={index}
				item={item}
				style={[isFirst && styles.firstItem, isLast && styles.lastItem]}
			/>
		);
	};

	useEffect(() => {
		tokens.forEach((token) => tokensList.push(token as TokenDocument));
	}, [tokens]);

	return (
		<FlatList
			style={style}
			contentContainerStyle={contentContainerStyle}
			data={items || tokensList}
			renderItem={renderItem}
			ItemSeparatorComponent={Separator}
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
