import { type FC } from 'react';
import { type MetadataDocument } from '@walless/store';
import { ScrollView, Stack } from '@walless/ui';

import CollectibleItem from './Item';

interface Props {
	items: MetadataDocument[];
}

export const CollectibeList: FC<Props> = ({ items }) => {
	const leftColumnItems = items.filter((_, index) => index % 2 === 0);
	const rightColumnItems = items.filter((_, index) => index % 2 !== 0);

	return (
		<ScrollView marginVertical={12} contentContainerStyle={{ gap: 15 }}>
			<Stack horizontal gap={15}>
				<Stack flex={1} gap={15} flexBasis={0}>
					{leftColumnItems.map((item) => (
						<CollectibleItem key={item._id} item={item} />
					))}
				</Stack>
				<Stack flex={1} gap={15} flexBasis={0}>
					{rightColumnItems.map((item) => (
						<CollectibleItem key={item._id} item={item} />
					))}
				</Stack>
			</Stack>
		</ScrollView>
	);
};

export default CollectibeList;
