import { Stack, Text } from '@walless/gui';

const Collectibles = () => {
	const numberOfCollectibles = 8;

	const handlePressSeeAll = () => {
		console.log('See All');
	};

	return (
		<Stack width="100%">
			<Stack
				marginHorizontal={16}
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Text fontSize={18} fontWeight="500">
					NFT Collectibles ({numberOfCollectibles})
				</Text>
				<Text
					color="#566674"
					fontSize={12}
					paddingVertical={4}
					paddingHorizontal={8}
					borderWidth={1}
					borderColor="#56667433"
					borderRadius={8}
					onPress={handlePressSeeAll}
				>
					See All
				</Text>
			</Stack>
		</Stack>
	);
};

export default Collectibles;
