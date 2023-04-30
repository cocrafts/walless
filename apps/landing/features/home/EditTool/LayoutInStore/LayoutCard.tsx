import { FC } from 'react';
import { Image, Stack, Text } from '@walless/ui';

import TargetWrapper from '../TargetWrapper';

import LayoutCardBottomPart from './LayoutCardBottomPart';
import {
	initialLayoutCardProps,
	LayoutCardComponent,
	LayoutCardProps,
} from '.';

interface Props {
	item: LayoutCardProps;
	activeComponent: LayoutCardComponent | null;
}

const LayoutCard: FC<Props> = ({ item, activeComponent }) => {
	return (
		<Stack backgroundColor="#131C24" maxWidth={320} borderRadius={12}>
			<TargetWrapper
				isTargeted={activeComponent === LayoutCardComponent.coverImage}
			>
				<Image
					src={item.coverImage}
					width={320}
					height={133}
					borderTopLeftRadius={12}
					borderTopRightRadius={12}
				/>
			</TargetWrapper>

			<Stack
				paddingHorizontal={12}
				paddingVertical={5}
				display="flex"
				justifyContent="flex-end"
				marginTop={-20}
			>
				<TargetWrapper
					isTargeted={activeComponent === LayoutCardComponent.avatar}
				>
					<Stack
						width={32}
						height={32}
						borderRadius={8}
						alignItems="center"
						justifyContent="center"
						overflow="hidden"
					>
						<Image src={item.avatar} width={32} height={32} />
					</Stack>
				</TargetWrapper>

				<TargetWrapper
					isTargeted={activeComponent === LayoutCardComponent.projectName}
				>
					<Text fontSize={14} marginTop={4} fontWeight="600">
						{item.projectName === ''
							? initialLayoutCardProps.projectName
							: item.projectName}
					</Text>
				</TargetWrapper>

				<TargetWrapper
					isTargeted={activeComponent === LayoutCardComponent.description}
				>
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
						{item.description === ''
							? initialLayoutCardProps.description
							: item.description}
					</Text>
				</TargetWrapper>

				<LayoutCardBottomPart />
			</Stack>
		</Stack>
	);
};

export default LayoutCard;
