import { type FC, useMemo, useState } from 'react';
import { Image } from 'react-native';
import { Hoverable, View } from '@walless/gui';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';

interface Props {
	collections?: CollectionDocument[];
	collectibles?: CollectibleDocument[];
}

export const CollectiblesTab: FC<Props> = ({
	collections = [],
	collectibles = [],
}) => {
	const [collection, setCollection] = useState<CollectionDocument>();

	const curCollectibles = useMemo(
		() => collectibles.filter((ele) => ele.collectionId === collection?._id),
		[collection],
	);

	return (
		<View>
			{!collection
				? collections.map((ele) => (
						<Hoverable key={ele._id} onPress={() => setCollection(ele)}>
							<Image
								source={{ uri: ele.metadata?.imageUri }}
								style={{ height: 100 }}
							/>
						</Hoverable>
				  ))
				: curCollectibles.map((ele) => (
						<View key={ele._id}>
							<Image
								source={{ uri: ele.metadata?.imageUri }}
								style={{ height: 100 }}
							/>
						</View>
				  ))}
		</View>
	);
};

export default CollectiblesTab;
