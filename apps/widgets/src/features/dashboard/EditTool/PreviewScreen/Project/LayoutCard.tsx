import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Text, View } from '@walless/gui';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

import type { ProjectState } from '../../internal';
import { ProjectTool } from '../../internal';
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
		<View>
			<Image
				style={{
					width: '100%',
					height: 133,
					resizeMode: 'cover',
					borderTopLeftRadius: 12,
					borderTopRightRadius: 12,
				}}
				source={{ uri: projectState.banner }}
			/>
			<View
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 133,
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8,
					backgroundColor:
						snap.tools.target === ProjectTool.banner
							? 'rgb(6, 148, 211, 0.7)'
							: 'transparent',
				}}
			/>
			<View
				style={{
					paddingHorizontal: 12,
					paddingVertical: 5,
					display: 'flex',
					justifyContent: 'flex-end',
					marginTop: -20,
					overflow: 'hidden',
				}}
			>
				<TargetWrapper isTargeted={snap.tools.target === ProjectTool.logo}>
					<View
						style={{
							width: 32,
							height: 32,
							borderRadius: 8,
							borderWidth: 1,
							borderColor: '#131C24',
							alignItems: 'center',
							justifyContent: 'center',
							overflow: 'hidden',
						}}
					>
						<Image
							style={{ width: 32, height: 32 }}
							source={{ uri: projectState.logo }}
						/>
					</View>
				</TargetWrapper>

				<TargetWrapper isTargeted={snap.tools.target === ProjectTool.name}>
					<Text
						style={{
							fontSize: 14,
							fontWeight: '600',
							marginTop: 4,
						}}
					>
						{projectState.name === '' ? 'Project name' : projectState.name}
					</Text>
				</TargetWrapper>

				<TargetWrapper
					isTargeted={snap.tools.target === ProjectTool.description}
				>
					<Text
						style={{
							fontSize: 12,
							lineHeight: 18,
							fontWeight: '400',
							color: '#566674',
							flexWrap: 'wrap',
							marginTop: 4,
						}}
					>
						{projectState.description === ''
							? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							: projectState.description}
					</Text>
				</TargetWrapper>

				<LayoutCardBottomPart />
			</View>
		</View>
	);
};

export default LayoutCard;
