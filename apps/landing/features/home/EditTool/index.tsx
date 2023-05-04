import { useState } from 'react';
import { Stack } from '@walless/ui';
import { ContainerStack } from 'components/styled';

import ProjectInfo from './preview/ProjectInfo';
import TokenInfo from './preview/TokenInfo';
import ProjectInfoTools from './Toolbox/tools/ProjectInfo';
import Header from './Header';
import { ToolboxItem } from './internal';
import Toolbox from './Toolbox';

const tools: ToolboxItem[] = [
	{
		name: 'Project info',
		preview: ProjectInfo,
		components: ProjectInfoTools,
	},
	{
		name: 'Token info',
		preview: TokenInfo,
		components: [],
	},
];

const EditTool = () => {
	const [activeTool, setActiveTool] = useState<ToolboxItem>(tools[0] ?? null);

	return (
		<ContainerStack marginTop={72} maxWidth={1500} alignItems="center" gap={36}>
			<Header />
			<Stack marginTop={60} marginBottom={80}>
				{activeTool?.preview()}
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
