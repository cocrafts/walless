import { FC } from 'react';
import { Image, Stack, Text } from '@walless/gui';

import { LayoutCardProps } from './interface';

const LayoutCard: FC<LayoutCardProps> = (props) => {
	return (
		<Stack
			backgroundColor="#131C24"
			width="100%"
			height={259}
			borderRadius={12}
		>
			<Image
				src={props.thumbnail}
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
				<Image src={props.logo} width={40} height={40} borderRadius={8} />

				<Text fontWeight="600" fontSize={14}>
					{props.name}
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
					{props.description}
				</Text>
			</Stack>
		</Stack>
	);
};

export default LayoutCard;
