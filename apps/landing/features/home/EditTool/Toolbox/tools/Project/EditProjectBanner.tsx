import { FC } from 'react';
import { Stack } from '@walless/ui';
import {
	ProjectTool,
	ToolboxComponentProps,
} from 'features/home/EditTool/internal';

import ToolDescription from '../components/ToolDescription';

const EditProjectBanner: FC<ToolboxComponentProps> = ({ setTarget }) => {
	const onTarget = () => setTarget(ProjectTool.banner);

	return (
		<Stack onHoverIn={onTarget} onHoverOut={() => setTarget(null)}>
			<ToolDescription
				name="Banner"
				description="A stunning designed banner to make your project more compelling"
			/>
		</Stack>
	);
};

export default EditProjectBanner;
