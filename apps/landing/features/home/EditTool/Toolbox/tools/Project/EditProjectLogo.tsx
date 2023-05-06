import { FC } from 'react';
import { Stack } from '@walless/ui';
import { handleChangeImage } from 'features/home/EditTool/helpers';
import {
	ProjectTool,
	ToolboxComponentProps,
} from 'features/home/EditTool/internal';
import { editToolActions } from 'state/app';

import ToolDescription from '../components/ToolDescription';

const EditProjectAvatar: FC<ToolboxComponentProps> = ({ setTarget }) => {
	const onTarget = () => setTarget(ProjectTool.logo);

	return (
		<Stack onHoverIn={onTarget} onHoverOut={() => setTarget(null)}>
			<ToolDescription
				name="Logo/Icon"
				description="Your project official logo/icon"
			/>
			<input
				type="file"
				accept="image/png,image/jpeg,image/jpg,image/gif"
				onChange={(e) => handleChangeImage(e, editToolActions.setProjectLogo)}
			/>
		</Stack>
	);
};

export default EditProjectAvatar;
