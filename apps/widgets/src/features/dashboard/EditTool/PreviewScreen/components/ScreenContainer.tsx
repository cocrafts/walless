import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { View } from '@walless/gui';
import { Compass } from '@walless/icons';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

import type { ProjectState } from '../../internal';
import { ProjectTool } from '../../internal';

import Sidebar from './Sidebar';
import TargetWrapper from './TargetWrapper';

interface Props {
	children: ReactNode;
}

const ScreenContainer: FC<Props> = ({ children }) => {
	const snap = useSnapshot(appState);
	const [projectState, setProjectState] = useState<ProjectState>(
		snap.tools.project,
	);

	useEffect(() => {
		setProjectState(appState.tools.project);
	}, [snap]);

	return (
		<View
			style={{
				borderWidth: 1,
				borderColor: '#364654',
				borderRadius: 10,
				backgroundColor: '#0A1117',
				flexDirection: 'row',
				maxWidth: 442,
			}}
		>
			<Sidebar>
				<View
					style={{
						flex: 1,
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View>
						<TargetWrapper isTargeted={snap.tools.target === ProjectTool.logo}>
							<Image
								style={{
									width: 36,
									height: 36,
									borderRadius: 1000,
								}}
								source={{ uri: projectState.logo }}
							/>
						</TargetWrapper>

						<View
							style={{
								width: 36,
								height: 36,
								borderRadius: 10,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: '#243F56',
							}}
						>
							<Compass size={20} color="#0694D3" />
						</View>
					</View>

					<Image
						style={{
							width: 36,
							height: 36,
							borderRadius: 1000,
						}}
						source={{ uri: '/img/avatar.png' }}
					/>
				</View>
			</Sidebar>
			<View>{children}</View>
		</View>
	);
};

export default ScreenContainer;
