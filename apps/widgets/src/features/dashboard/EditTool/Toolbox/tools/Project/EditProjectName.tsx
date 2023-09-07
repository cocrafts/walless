import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Input, View } from '@walless/gui';
import { Bookmark } from '@walless/icons';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

import TextLimit from '../components/TextLimit';
import ToolBox from '../components/ToolBox';
import ToolDescription from '../components/ToolDescription';

const EditProjectName: FC = () => {
	const project = useSnapshot(appState.tools.project);
	const maxLength = 40;

	return (
		<ToolBox>
			<View horizontal style={styles.header}>
				<ToolDescription
					name="Project name"
					description="Your Project name in short"
				/>
				<TextLimit current={project.name.length} limit={maxLength} />
			</View>

			<Input
				style={styles.input}
				inputStyle={styles.inputText}
				prefix={<Bookmark color="#566674" />}
				placeholder="Name your project"
			/>
		</ToolBox>
	);
};

export default EditProjectName;

const styles = StyleSheet.create({
	header: {
		justifyContent: 'space-between',
	},
	textLimit: {
		fontSize: 13,
	},
	input: {
		padding: 10,
	},
	inputText: {
		color: '#ffffff',
		paddingHorizontal: 4,
		paddingVertical: 4,
	},
});
