import type { FC } from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useNfts } from '@walless/app/utils/hooks';
import { Hoverable, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { useParams } from 'utils/hooks';
import { router } from 'utils/routing';

import { CollectionItem } from './components/CollectibleItem';

export const Collection: FC = () => {
	const { id } = useParams<'id'>();
	const { collections, collectibles } = useNfts();

	const curCollection = useMemo(() => {
		return collections.find((ele) => ele._id.includes(id as string));
	}, [collections]);

	const curCollectibles = useMemo(() => {
		return collectibles.filter((ele) =>
			ele.collectionId.includes(id as string),
		);
	}, [collectibles]);

	return (
		<View style={styles.container}>
			<Hoverable style={styles.backButton} onPress={() => router.navigate(-1)}>
				<ChevronLeft size={16} />
				<Text style={styles.title}>
					{`${curCollection?.metadata?.name} (${curCollectibles.length})` ||
						'Unknown collection'}
				</Text>
			</Hoverable>
			<View style={styles.collectiblesContainer}>
				{curCollectibles.map((ele) => (
					<CollectionItem
						key={ele._id}
						item={ele}
						onPress={() => router.navigate(`/nfts/${ele._id.split('/')[2]}`)}
					/>
				))}
			</View>
		</View>
	);
};

export default Collection;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 17,
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		marginTop: 6,
	},
	title: {
		fontSize: 18,
		color: '#FFFFFF',
	},
	collectiblesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 10,
	},
});
