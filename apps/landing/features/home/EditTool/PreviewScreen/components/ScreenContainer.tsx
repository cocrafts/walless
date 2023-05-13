import { type FC, type ReactNode, useEffect, useState } from 'react';
import { Compass } from '@walless/icons';
import { Image, Stack } from '@walless/ui';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { type ProjectState } from '../../internal';
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
		<Stack
			borderWidth={1}
			borderColor="#364654"
			borderRadius={10}
			backgroundColor="#0A1117"
			flexDirection="row"
			width={442}
		>
			<Sidebar>
				<Stack flex={1} justifyContent="space-between" alignItems="center">
					<Stack gap={10}>
						<TargetWrapper isTargeted={snap.tools.target === ProjectTool.logo}>
							<Image
								src={projectState.logo}
								width={36}
								height={36}
								borderRadius={1000}
							/>
						</TargetWrapper>

						<Stack
							width={36}
							height={36}
							borderRadius={10}
							justifyContent="center"
							alignItems="center"
							backgroundColor="#243F56"
						>
							<Compass size={20} color="#0694D3" />
						</Stack>
					</Stack>

					<Image
						src="/img/avatar.png"
						width={36}
						height={36}
						borderRadius={10}
					/>
				</Stack>
			</Sidebar>

			<Stack flex={1} alignItems="center">
				{children}
			</Stack>
		</Stack>
	);
};

export default ScreenContainer;
