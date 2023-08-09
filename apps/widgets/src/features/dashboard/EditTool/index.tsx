import { useState } from 'react';
import { View } from '@walless/gui';

import Detail from './PreviewScreen/Detail';
import Project from './PreviewScreen/Project';
import DetailTools from './Toolbox/tools/Detail';
import ProjectTools from './Toolbox/tools/Project';
import Header from './Header';
import type { ToolboxItem } from './internal';
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

export const EditTool = () => {
	const [activeTool, setActiveTool] = useState<ToolboxItem>(tools[0] ?? null);

	return (
		<View>
			<Header />
			<View>
				<activeTool.preview />
			</View>
			<View>
				<PreviewOutline
					tools={tools}
					activeTool={activeTool}
					setActiveTool={setActiveTool}
				/>
			</View>
			<Toolbox
				tools={tools}
				activeTool={activeTool}
				setActiveTool={setActiveTool}
			/>
		</View>
	);
};

export default EditTool;
