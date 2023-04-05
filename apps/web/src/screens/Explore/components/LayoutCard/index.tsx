import { FC } from 'react';
import { Heart, Image, Plus, Stack, Text } from '@walless/gui';
import AddLayoutBtn from './AddLayoutBtn';

export interface LayoutCardProps {
	id: string;
	name: string;
	description: string;
	thumbnail: string;
	logo: string;
	loveCount: number;
	isLoved: boolean;
	activeUsers: number;
}

const LayoutCard: FC<LayoutCardProps> = ({
	name,
	description,
	thumbnail,
	logo,
	loveCount,
	isLoved,
	activeUsers,
}) => {
	const heartColors = ['white', 'none'];
	const handleLoveBtn = () => {
		console.log(isLoved);
	};
	const handleAddLayout = () => {
		console.log('add layout');
	};

	return (
		<Stack
			backgroundColor="#131C24"
			width="100%"
			height={259}
			borderRadius={12}
		>
			<Image
				src={thumbnail}
				width="100%"
				height={133}
				borderTopLeftRadius={12}
				borderTopRightRadius={12}
			/>

			<Stack
				marginHorizontal={12}
				marginVertical={16}
				display="flex"
				y={-36}
				zIndex={1}
			>
				<Image src={logo} width={40} height={40} borderRadius={8} />

				<Text fontWeight="600" fontSize={14}>
					{name}
				</Text>

				<Text
					fontSize={12}
					fontWeight="400"
					lineHeight={18}
					color="#566674"
					display="inline"
					wordWrap="break-word"
					textOverflow="ellipsis"
				>
					{description}
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
							onPress={handleLoveBtn}
						>
							<Heart size={8} colors={heartColors} />
							<Text fontWeight="400" fontSize={10}>
								{loveCount} Love
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
								{activeUsers} Active
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
