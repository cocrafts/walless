import { FC } from 'react';
import { Image, Stack, Text } from '@walless/gui';
import { Heart } from '@walless/icons';
import { Layout } from 'screens/Explore/internal';

import AddLayoutBtn from './AddLayoutBtn';

export interface LayoutCardProps {
	item: Layout;
	onPressLoveBtn: (layout: Layout) => void;
}

const LayoutCard: FC<LayoutCardProps> = ({ item, onPressLoveBtn }) => {
	const heartColors = item.isLoved ? ['red', 'red'] : ['white', 'none'];

	const handlePressLoveBtn = () => {
		onPressLoveBtn(item);
	};

	const handleAddLayout = () => {
		console.log('add layout');
	};

	return (
		<Stack backgroundColor="#131C24" width={332} height={259} borderRadius={12}>
			<Image
				src={item.thumbnail}
				width={332}
				height={133}
				borderTopLeftRadius={12}
				borderTopRightRadius={12}
			/>

			<Stack
				fullscreen
				paddingHorizontal={12}
				paddingVertical={5}
				display="flex"
				justifyContent="flex-end"
			>
				<Image
					src={item.logo}
					width={40}
					height={40}
					borderRadius={8}
					borderWidth={2}
					borderColor="#10181F"
				/>

				<Text fontSize={14} marginTop={4} fontWeight="600">
					{item.name}
				</Text>

				<Text
					fontSize={12}
					fontWeight="400"
					lineHeight={18}
					color="#566674"
					display="inline"
					wordWrap="break-word"
					textOverflow="ellipsis"
					numberOfLines={2}
				>
					{item.description}
				</Text>

				<Stack
					display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					marginTop={6}
					marginBottom={10}
				>
					<Stack display="flex" flexDirection="row" gap={11}>
						<Stack
							display="flex"
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
							gap={4}
							onPress={handlePressLoveBtn}
						>
							<Heart size={8} colors={heartColors} />
							<Text fontWeight="400" fontSize={10}>
								{item.loveCount} Love
							</Text>
						</Stack>

						<Stack
							display="flex"
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
							gap={4}
						>
							<Stack
								width={8}
								height={8}
								borderRadius="100%"
								backgroundColor="#4DE2A4"
							/>
							<Text fontWeight="400" fontSize={10}>
								{item.activeUsers} Active
							</Text>
						</Stack>
					</Stack>

					<AddLayoutBtn handleAddLayout={handleAddLayout} />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LayoutCard;
