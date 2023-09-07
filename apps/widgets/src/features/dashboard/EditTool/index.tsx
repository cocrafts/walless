import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { dimensionState, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import Detail from './PreviewScreen/Detail';
import Project from './PreviewScreen/Project';
import DetailTools from './Tools/tools/Detail';
import ProjectTools from './Tools/tools/Project';
import Header from './Header';
import type { ToolboxItem } from './internal';
import PreviewOutline from './PreviewOutline';
import Tools from './Tools';

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
	const { responsiveLevel } = useSnapshot(dimensionState);
	const [activeTool, setActiveTool] = useState<ToolboxItem>(tools[0] ?? null);

	const outlineStyle: ViewStyle =
		responsiveLevel > 1
			? { marginLeft: 10, justifyContent: 'flex-end' }
			: {
					marginLeft: 'auto',
					position: 'absolute',
					bottom: 0,
					width: '100%',
			  };

	const previewContainerStyle: ViewStyle =
		responsiveLevel > 1
			? { justifyContent: 'space-between' }
			: { alignItems: 'center' };

	return (
		<View style={styles.container}>
			<Header />
			<View
				horizontal={responsiveLevel > 1}
				style={[styles.previewContainer, previewContainerStyle]}
			>
				<activeTool.preview />
				<View style={outlineStyle}>
					<PreviewOutline
						tools={tools}
						activeTool={activeTool}
						setActiveTool={setActiveTool}
					/>
				</View>
			</View>

			<View style={{ marginTop: 40 }}>
				<Tools
					tools={tools}
					activeTool={activeTool}
					setActiveTool={setActiveTool}
				/>
			</View>
		</View>
	);
};

export default EditTool;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		maxWidth: 1200,
		paddingHorizontal: 16,
		marginHorizontal: 'auto',
	},
	previewContainer: {
		width: '100%',
		// alignItems: 'stretch',
		marginTop: 40,
	},
	outline: {
		marginLeft: 'auto',
		// position: 'absolute',
		bottom: 0,
		// width: '100%',
	},
});
