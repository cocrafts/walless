import { FC } from 'react';
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native';

import { CollectibleMeta } from '../../utils/types';

import CollectibleItem from './Item';

interface Props {
	style?: StyleProp<ViewStyle>;
	data: CollectibleMeta[];
}

export const CollectibleList: FC<Props> = ({ style, data }) => {
	const renderItem: ListRenderItem<CollectibleMeta> = ({ item, index }) => {
		return <CollectibleItem index={index} item={item} />;
	};

	return (
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			data={data}
			renderItem={renderItem}
			style={style}
		></FlatList>
	);
};

export default CollectibleList;
