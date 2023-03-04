import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Image, View } from '@walless/ui';

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
		<View className={`flex flex-row gap-3 justify-between ${className}`}>
			{collectibles.map((collectible) => (
				<View key={collectible.name} className="w-[84px]">
					<Link to={collectible.link}>
						<Image
							source={{ uri: collectible.thumbnail }}
							className="h-[90px] w-[84px]"
						/>
					</Link>

					<View className="flex flex-row gap-1">
						<Link to={collectible.link}>
							<Image
								source={{ uri: collectible.icon }}
								className="h-5 w-5 ml-2 -mt-2"
							/>
						</Link>
						<Link
							className="h-3 text-[8px] mt-1 overflow-hidden"
							to={collectible.link}
						>
							{collectible.name}
						</Link>
					</View>
				</View>
			))}
		</View>
	);
};

export default CollectiblesCarousel;
