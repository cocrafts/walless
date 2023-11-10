import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useNfts } from '@walless/app/utils/hooks';
import { View } from '@walless/gui';
import type { CollectionDocument } from '@walless/store';
import { router } from 'utils/routing';

import CollectibleItem from './CollectibleItem';

interface Props {
	collections?: CollectionDocument[];
}

export const CollectiblesTab: FC<Props> = ({ collections = [] }) => {
	const handlePressItem = (ele: CollectionDocument) => {
		router.navigate(`/collections/${(ele._id as string).split('/')[2]}`);
	};

	return (
		<View style={styles.container}>
			{collections.map((ele, index) => (
				<CollectibleItem
					key={index}
					item={ele}
					onPress={() => handlePressItem(ele)}
				/>
			))}
		</View>
	);
};

export default CollectiblesTab;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 10,
		paddingTop: 10,
		paddingBottom: 60,
	},
});
