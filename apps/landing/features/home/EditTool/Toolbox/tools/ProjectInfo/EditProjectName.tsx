import { FC } from 'react';
import { Stack } from '@walless/ui';
import {
	ProjectInfoComponent,
	ToolboxComponentProps,
} from 'features/home/EditTool/internal';

import ToolDescription from '../components/ToolDescription';

const EditProjectName: FC<ToolboxComponentProps> = ({ setTarget }) => {
	const onTarget = () =>
		setTarget({
			component: ProjectInfoComponent.name,
			payload: 'Project name',
		});

	return (
		<Stack onPress={onTarget}>
			<ToolDescription
				name="Project name"
				description="Lorem ipsum dolor amet mustache knausgaard"
			/>
		</Stack>
	);
};

export default EditProjectName;
