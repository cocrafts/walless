import { FC } from 'react';
import { FlatList } from 'react-native';
import { View } from '@walless/ui';

import CollectibleItem from './CollectibleItem';
import EmptyComponent from './EmptyComponent';
import { CollectibleProps } from '.';

interface CollectiblesCarouselProps {
	className?: string;
	collectibles: CollectibleProps[];
}

const CollectiblesCarousel: FC<CollectiblesCarouselProps> = ({
	className,
	collectibles,
}) => {
	return (
		<FlatList
			data={collectibles}
			renderItem={CollectibleItem}
			keyExtractor={(item) => item.name}
			horizontal
			ListEmptyComponent={() => <EmptyComponent />}
			ItemSeparatorComponent={() => <View className="w-3" />}
			showsHorizontalScrollIndicator={false}
			bounces={false}
			decelerationRate="normal"
			snapToInterval={collectibles.length}
			snapToAlignment="start"
			className={className}
		/>
	);
};

export default CollectiblesCarousel;
