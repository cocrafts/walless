import { useState } from 'react';
import { Stack } from '@walless/ui';
import { ContainerStack } from 'components/styled';

import ProjectInfo from './preview/ProjectInfo';
import TokenInfo from './preview/TokenInfo';
import ProjectInfoTools from './Toolbox/tools/ProjectInfo';
import Header from './Header';
import { Target, ToolboxItem } from './internal';
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
	const [target, setTarget] = useState<Target>(null);

	return (
		<ContainerStack marginTop={72} maxWidth={1500} alignItems="center" gap={36}>
			<Header />
			<Stack marginTop={60} marginBottom={80}>
				{activeTool?.preview && <activeTool.preview target={target} />}
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
