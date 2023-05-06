import { FC } from 'react';
import { Input, Stack } from '@walless/ui';
import {
	ProjectTool,
	ToolboxComponentProps,
} from 'features/home/EditTool/internal';
import { appState, editToolActions } from 'state/app';

import ToolDescription from '../components/ToolDescription';

const EditProjectName: FC<ToolboxComponentProps> = ({ setTarget }) => {
	const onTarget = () => setTarget(ProjectTool.name);

	return (
		<Stack gap={10} onHoverIn={onTarget} onHoverOut={() => setTarget(null)}>
			<ToolDescription
				name="Project name"
				description="Lorem ipsum dolor amet mustache knausgaard"
			/>

			<Input
				defaultValue={appState.tools.project.name}
				onChangeText={editToolActions.setProjectName}
			/>
		</Stack>
	);
};

export default EditProjectName;
