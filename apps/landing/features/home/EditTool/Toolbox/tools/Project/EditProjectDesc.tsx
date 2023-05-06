import { FC } from 'react';
import { Input, Stack } from '@walless/ui';
import {
	ProjectTool,
	ToolboxComponentProps,
} from 'features/home/EditTool/internal';
import { appState, editToolActions } from 'state/app';

import ToolDescription from '../components/ToolDescription';

const EditProjectDesc: FC<ToolboxComponentProps> = ({ setTarget }) => {
	const onTarget = () => setTarget(ProjectTool.description);

	return (
		<Stack onHoverIn={onTarget} onHoverOut={() => setTarget(null)}>
			<ToolDescription
				name="Description"
				description="A short, concise and sharp project introduction to understand easily"
			/>

			<Input
				defaultValue={appState.tools.project.description}
				onChangeText={editToolActions.setProjectDescription}
			/>
		</Stack>
	);
};

export default EditProjectDesc;
