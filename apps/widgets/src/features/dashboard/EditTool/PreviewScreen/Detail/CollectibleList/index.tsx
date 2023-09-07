import type { FC } from 'react';
import { ScrollView } from 'react-native';
import { View } from '@walless/gui';
import type { MetadataDocument } from '@walless/store';

import CollectibleItem from './Item';

interface Props {
	items: MetadataDocument[];
}

export const CollectibleList: FC<Props> = ({ items }) => {
	const leftColumnItems = items.filter((_, index) => index % 2 === 0);
	const rightColumnItems = items.filter((_, index) => index % 2 !== 0);

	return (
		<ScrollView contentContainerStyle={{ gap: 15 }}>
			<View horizontal>
				<View>
					{leftColumnItems.map((item) => (
						<CollectibleItem key={item._id} item={item} />
					))}
				</View>
				<View>
					{rightColumnItems.map((item) => (
						<CollectibleItem key={item._id} item={item} />
					))}
				</View>
			</View>
		</ScrollView>
	);
};

export default CollectibleList;
