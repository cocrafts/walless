import { useState } from 'react';
import { Stack } from '@walless/ui';
import { ContainerStack } from 'components/styled';

import Detail from './preview/Detail';
import Project from './preview/Project';
import ProjectTools from './Toolbox/tools/Project';
import Header from './Header';
import { Target, ToolboxItem } from './internal';
import PreviewOutline from './PreviewOutline';
import Toolbox from './Toolbox';

const tools: ToolboxItem[] = [
	{
		name: 'Project info',
		preview: Project,
		previewImage: '/img/preview/project-info.png',
		components: ProjectTools,
	},
	{
		name: 'Token info',
		preview: Detail,
		previewImage: '/img/preview/token-info.png',
		components: [],
	},
];

const EditTool = () => {
	const [activeTool, setActiveTool] = useState<ToolboxItem>(tools[0] ?? null);
	const [target, setTarget] = useState<Target>(null);

	return (
		<ContainerStack marginTop={72} maxWidth={1500} alignItems="center">
			<Header />

			<Stack marginTop={60} marginBottom={80} justifyContent="center">
				{activeTool?.preview && <activeTool.preview target={target} />}
			</Stack>

			<Stack marginBottom={20} alignSelf="flex-start">
				<PreviewOutline
					tools={tools}
					activeTool={activeTool}
					setActiveTool={setActiveTool}
				/>
			</Stack>

			<Toolbox
				tools={tools}
				activeTool={activeTool}
				setActiveTool={setActiveTool}
				setTarget={setTarget}
			/>
		</ContainerStack>
	);
};

export default EditTool;
