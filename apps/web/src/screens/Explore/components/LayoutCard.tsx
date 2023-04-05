import { FC } from 'react';
import { Image, Stack, Text } from '@walless/gui';

export interface LayoutCardProps {
	id: string;
	name: string;
	description: string;
	thumbnail: string;
	logo: string;
	loveCount: number;
	activeUsers: number;
}

const LayoutCard: FC<LayoutCardProps> = ({
	name,
	description,
	thumbnail,
	logo,
}) => {
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
			</Stack>
		</Stack>
	);
};

export default LayoutCard;
