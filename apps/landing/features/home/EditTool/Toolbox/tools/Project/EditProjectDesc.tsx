import { FC } from 'react';
import { Stack } from '@walless/ui';
import {
	ProjectInfoComponent,
	ToolboxComponentProps,
} from 'features/home/EditTool/internal';

import ToolDescription from '../components/ToolDescription';

const EditProjectDesc: FC<ToolboxComponentProps> = ({ setTarget }) => {
	const onTarget = () => setTarget(ProjectInfoComponent.description);

	return (
		<Stack onHoverIn={onTarget} onHoverOut={() => setTarget(null)}>
			<ToolDescription
				name="Description"
				description="A short, concise and sharp project introduction to understand easily"
			/>
		</Stack>
	);
};

export default EditProjectDesc;
