import { FC } from 'react';
import { Image, Stack, Text } from '@walless/gui';
import { Heart } from '@walless/icons';
import { LayoutCardProps } from 'screens/Explore/internal';

import AddLayoutBtn from './AddLayoutBtn';

const LayoutCard: FC<LayoutCardProps> = ({ item, onLovePress, onAddPress }) => {
	const { storeMeta } = item;
	const coverSrc = { uri: storeMeta.coverUri };
	const iconSrc = { uri: storeMeta.iconUri };
	const heartColors = false ? ['red', 'red'] : ['white', 'none'];

	return (
		<Stack backgroundColor="#131C24" height={259} borderRadius={12}>
			<Image
				src={coverSrc}
				width="100%"
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
				<Stack
					width={iconWrapperSize}
					height={iconWrapperSize}
					borderRadius={8}
					backgroundColor={storeMeta.iconColor}
					alignItems="center"
					justifyContent="center"
				>
					<Image
						src={iconSrc}
						width={storeMeta.iconSize}
						height={storeMeta.iconSize}
					/>
				</Stack>

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
					marginTop={4}
				>
					{storeMeta.description}
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
							onPress={() => onLovePress?.(item)}
						>
							<Heart size={8} colors={heartColors} />
							<Text fontWeight="400" fontSize={10}>
								{storeMeta.loveCount} Love
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
								{storeMeta.activeCount} Active
							</Text>
						</Stack>
					</Stack>

					<AddLayoutBtn handleAddLayout={() => onAddPress?.(item)} />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LayoutCard;

const iconWrapperSize = 40;
