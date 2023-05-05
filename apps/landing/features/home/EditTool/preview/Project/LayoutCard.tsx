import { FC } from 'react';
import { Image, Stack, Text } from '@walless/ui';

import { ProjectState, ProjectTool, Target } from '../../internal';
import TargetWrapper from '../TargetWrapper';

import LayoutCardBottomPart from './LayoutCardBottomPart';
interface Props {
	projectState: ProjectState;
	target: Target;
}

const LayoutCard: FC<Props> = ({ target, projectState }) => {
	return (
		<Stack backgroundColor="#131C24" maxWidth={320} borderRadius={12}>
			<TargetWrapper isTargeted={target === ProjectTool.banner}>
				<Image
					src={projectState.banner}
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
						<Image src={projectState.logo} width={32} height={32} />
					</Stack>
				</TargetWrapper>

				<TargetWrapper isTargeted={target === ProjectTool.name}>
					<Text fontSize={14} marginTop={4} fontWeight="600">
						{projectState.name === '' ? 'Project name' : projectState.name}
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
						{projectState.description === ''
							? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							: projectState.description}
					</Text>
				</TargetWrapper>

				<LayoutCardBottomPart />
			</Stack>
		</Stack>
	);
};

export default LayoutCard;
