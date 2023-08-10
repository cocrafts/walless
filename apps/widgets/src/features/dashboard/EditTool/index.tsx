import { useState } from 'react';
import { StyleSheet } from 'react-native';
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
		<View horizontal style={styles.container}>
			<View style={styles.leftContainer}>
				<View horizontal style={styles.headerContainer}>
					<Header />
					<PreviewOutline
						tools={tools}
						activeTool={activeTool}
						setActiveTool={setActiveTool}
					/>
				</View>
				<activeTool.preview />
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

const styles = StyleSheet.create({
	container: {
		gap: 40,
	},
	leftContainer: {
		gap: 20,
	},
	headerContainer: {
		gap: 40,
		justifyContent: 'space-between',
	},
});
