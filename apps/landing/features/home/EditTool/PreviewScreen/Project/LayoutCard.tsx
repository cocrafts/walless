import { type FC, useEffect, useState } from 'react';
import { Image, Stack, Text } from '@walless/ui';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { type ProjectState, ProjectTool } from '../../internal';
import TargetWrapper from '../components/TargetWrapper';

import LayoutCardBottomPart from './LayoutCardBottomPart';

const LayoutCard: FC = () => {
	const snap = useSnapshot(appState);
	const [projectState, setProjectState] = useState<ProjectState>(
		snap.tools.project,
	);

	useEffect(() => {
		setProjectState(appState.tools.project);
	}, [snap]);

	return (
		<Stack backgroundColor="#131C24" borderRadius={12}>
			<Image
				src={projectState.banner}
				width="100%"
				height={133}
				resizeMode="cover"
				borderTopLeftRadius={12}
				borderTopRightRadius={12}
			/>
			<Stack
				position="absolute"
				top={0}
				left={0}
				right={0}
				height={133}
				borderTopLeftRadius={8}
				borderTopRightRadius={8}
				backgroundColor={
					snap.tools.target === ProjectTool.banner
						? 'rgb(6, 148, 211, 0.7)'
						: 'transparent'
				}
			/>
			<Stack
				paddingHorizontal={12}
				paddingVertical={5}
				display="flex"
				justifyContent="flex-end"
				marginTop={-20}
				overflow="hidden"
			>
				<TargetWrapper isTargeted={snap.tools.target === ProjectTool.logo}>
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

				<TargetWrapper isTargeted={snap.tools.target === ProjectTool.name}>
					<Text fontSize={14} marginTop={4} fontWeight="600">
						{projectState.name === '' ? 'Project name' : projectState.name}
					</Text>
				</TargetWrapper>

				<TargetWrapper
					isTargeted={snap.tools.target === ProjectTool.description}
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
