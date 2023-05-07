import { useState } from 'react';
import { Stack } from '@walless/ui';
import { ContainerStack } from 'components/styled';

import Detail from './PreviewScreen/Detail';
import Project from './PreviewScreen/Project';
import DetailTools from './Toolbox/tools/Detail';
import ProjectTools from './Toolbox/tools/Project';
import Header from './Header';
import { ToolboxItem } from './internal';
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
		name: 'Detail info',
		preview: Detail,
		previewImage: '/img/preview/detail-info.png',
		components: DetailTools,
	},
];

const EditTool = () => {
	const [activeTool, setActiveTool] = useState<ToolboxItem>(tools[0] ?? null);

	return (
		<ContainerStack marginTop={72} maxWidth={1500} alignItems="center">
			<Header />

			<Stack marginTop={60} marginBottom={-40} justifyContent="center">
				<activeTool.preview />
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
			/>
		</ContainerStack>
	);
};

export default EditTool;
