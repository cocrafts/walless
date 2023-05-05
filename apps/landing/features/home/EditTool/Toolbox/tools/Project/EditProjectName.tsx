import { FC } from 'react';
import { Stack } from '@walless/ui';
import {
	ProjectInfoComponent,
	ToolboxComponentProps,
} from 'features/home/EditTool/internal';

import ToolDescription from '../components/ToolDescription';

const EditProjectName: FC<ToolboxComponentProps> = ({ setTarget }) => {
	const onTarget = () => setTarget(ProjectInfoComponent.name);

	return (
		<Stack onHoverIn={onTarget} onHoverOut={() => setTarget(null)}>
			<ToolDescription
				name="Project name"
				description="Lorem ipsum dolor amet mustache knausgaard"
			/>
		</Stack>
	);
};

export default EditProjectName;
