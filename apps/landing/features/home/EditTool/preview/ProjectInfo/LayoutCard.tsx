import { FC } from 'react';
import { Image, Stack, Text } from '@walless/ui';

import { ProjectInfoComponent, Target } from '../../internal';
import TargetWrapper from '../TargetWrapper';

import LayoutCardBottomPart from './LayoutCardBottomPart';
import { LayoutCardProps } from '.';

interface Props {
	target: Target;
}

const initialLayoutCardProps: LayoutCardProps = {
	banner: 'https://picsum.photos/200/300',
	avatar: 'https://picsum.photos/200/300',
	name: 'Project Name',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
};

const LayoutCard: FC<Props> = ({ target }) => {
	const item = initialLayoutCardProps;

	return (
		<Stack backgroundColor="#131C24" maxWidth={320} borderRadius={12}>
			<TargetWrapper isTargeted={target === ProjectInfoComponent.banner}>
				<Image
					src={item.banner}
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
				<TargetWrapper isTargeted={target === ProjectInfoComponent.avatar}>
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

				<TargetWrapper isTargeted={target === ProjectInfoComponent.name}>
					<Text fontSize={14} marginTop={4} fontWeight="600">
						{item.name === '' ? initialLayoutCardProps.name : item.name}
					</Text>
				</TargetWrapper>

				<TargetWrapper isTargeted={target === ProjectInfoComponent.description}>
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
