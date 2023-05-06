import { FC } from 'react';
import { Stack } from '@walless/ui';
import { handleChangeImage } from 'features/home/EditTool/helpers';
import {
	ProjectTool,
	ToolboxComponentProps,
} from 'features/home/EditTool/internal';
import { editToolActions } from 'state/app';

import ToolDescription from '../components/ToolDescription';

const EditProjectBanner: FC<ToolboxComponentProps> = ({ setTarget }) => {
	const onTarget = () => setTarget(ProjectTool.banner);

	return (
		<Stack onHoverIn={onTarget} onHoverOut={() => setTarget(null)}>
			<ToolDescription
				name="Banner"
				description="A stunning designed banner to make your project more compelling"
			/>
			<input
				type="file"
				accept="image/png,image/jpeg,image/jpg,image/gif"
				onChange={(e) => handleChangeImage(e, editToolActions.setProjectBanner)}
			/>
		</Stack>
	);
};

export default EditProjectBanner;
