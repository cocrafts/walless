import { FC } from 'react';
import { Image, Stack, Text } from '@walless/ui';

import { ProjectTool, ProjectState, Target } from '../../internal';
import TargetWrapper from '../TargetWrapper';

import LayoutCardBottomPart from './LayoutCardBottomPart';
interface Props {
	target: Target;
}

const initialLayoutCardProps: ProjectState = {
	banner: '/img/preview/sui-banner.png',
	logo: '/img/preview/sui-logo.png',
	name: 'Sui',
	description:
		'Sui is an innovative, decentralized Layer 1 blockchain that redefines asset ownership.',
};

const LayoutCard: FC<Props> = ({ target }) => {
	const item = initialLayoutCardProps;

	return (
		<Stack backgroundColor="#131C24" maxWidth={320} borderRadius={12}>
			<TargetWrapper isTargeted={target === ProjectTool.banner}>
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
				<TargetWrapper isTargeted={target === ProjectTool.logo}>
					<Stack
						width={32}
						height={32}
						borderRadius={8}
						borderWidth={1}
						borderColor="#131C24"
						alignItems="center"
						justifyContent="center"
						overflow="hidden"
					>
						<Image src={item.logo} width={32} height={32} />
					</Stack>
				</TargetWrapper>

				<TargetWrapper isTargeted={target === ProjectTool.name}>
					<Text fontSize={14} marginTop={4} fontWeight="600">
						{item.name === '' ? initialLayoutCardProps.name : item.name}
					</Text>
				</TargetWrapper>

				<TargetWrapper isTargeted={target === ProjectTool.description}>
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
