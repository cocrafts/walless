import { FC } from 'react';
import { Stack } from '@walless/ui';
import {
	ProjectInfoComponent,
	ToolboxComponentProps,
} from 'features/home/EditTool/internal';

import ToolDescription from '../components/ToolDescription';

const EditProjectAvatar: FC<ToolboxComponentProps> = ({ setTarget }) => {
	const onTarget = () => setTarget(ProjectInfoComponent.avatar);

	return (
		<Stack onHoverIn={onTarget} onHoverOut={() => setTarget(null)}>
			<ToolDescription
				name="Logo/Icon"
				description="Your project official logo/icon"
			/>
		</Stack>
	);
};

export default EditProjectAvatar;
