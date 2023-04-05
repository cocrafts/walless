import { FC } from 'react';
import { Image, Stack, Text } from '@walless/gui';

export interface Collectible {
	id: string;
	name: string;
	thumbnail: string;
	logo: string;
}

export interface CollectibleCardProps {
	collectible: Collectible;
	setActiveCollectible: (collectible: Collectible) => void;
	isActive: boolean;
}

const CollectibleCard: FC<CollectibleCardProps> = ({
	collectible,
	isActive,
	setActiveCollectible,
}) => {
	return (
		<Stack
			width={150}
			marginBottom={18}
			overflow="hidden"
			backgroundColor="#131C24"
			borderRadius={12}
			onPress={() => setActiveCollectible(collectible)}
		>
			<Image src={collectible.thumbnail} width="100%" height={82} />
			<Stack
				paddingHorizontal={9}
				borderBottomLeftRadius={12}
				borderBottomRightRadius={12}
				borderWidth={isActive ? 1 : 0}
				borderTopWidth={0}
				borderColor="#293642"
			>
				<Image
					src={collectible.logo}
					width={35}
					height={35}
					borderWidth={2}
					borderRadius={10}
					borderColor="#10181F"
					position="relative"
					top={-18}
				/>
				<Text
					fontSize={14}
					fontWeight="600"
					wordWrap="break-word"
					textOverflow="ellipsis"
					marginTop={-12}
					marginBottom={9}
				>
					{collectible.name}
				</Text>
			</Stack>
		</Stack>
	);
};

export default CollectibleCard;
