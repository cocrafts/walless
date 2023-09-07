import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Input, View } from '@walless/gui';
import { ProjectTool } from 'features/dashboard/EditTool/internal';
import { appState, editToolActions } from 'state/tool';
import { useSnapshot } from 'valtio';

import TextLimit from '../components/TextLimit';
import ToolBox from '../components/ToolBox';
import ToolDescription from '../components/ToolDescription';

const EditProjectDesc: FC = () => {
	const project = useSnapshot(appState.tools.project);
	const maxLength = 100;
	const onTarget = () => editToolActions.setTarget(ProjectTool.description);

	return (
		<ToolBox onHover={onTarget}>
			<View horizontal style={styles.header}>
				<ToolDescription
					name="Description"
					description="A short, concise and sharp project introduction to understand easily"
				/>
				<TextLimit current={project.description.length} limit={maxLength} />
			</View>

			<View>
				<Input
					style={styles.input}
					inputStyle={styles.inputText}
					spellCheck={false}
					multiline={true}
					numberOfLines={3}
					maxLength={maxLength}
					defaultValue={project.description}
					onChangeText={editToolActions.setProjectDescription}
				/>
			</View>
		</ToolBox>
	);
};

export default EditProjectDesc;

const styles = StyleSheet.create({
	header: {
		justifyContent: 'space-between',
	},
	textLimit: {
		fontSize: 13,
	},
	input: {
		padding: 10,
		borderRadius: 8,
	},
	inputText: {
		color: '#ffffff',
		paddingHorizontal: 4,
		paddingVertical: 4,
		outlineStyle: 'none',
	},
});
