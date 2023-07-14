import type { FC } from 'react';
import { Stack, Text } from '@walless/ui';
import { ProjectTool } from 'features/home/EditTool/internal';
import { editToolActions } from 'state/app';

import ToolDescription from '../components/ToolDescription';
import UploadImage from '../components/UploadImage';

const EditProjectBanner: FC = () => {
	const onTarget = () => editToolActions.setTarget(ProjectTool.banner);

	return (
		<Stack
			gap={10}
			onHoverIn={onTarget}
			onHoverOut={editToolActions.unsetTarget}
		>
			<ToolDescription
				name="Banner"
				description="A stunning designed banner to make your project more compelling"
			/>
			<Stack flexDirection="row" gap={10} alignItems="center">
				<UploadImage
					width={74}
					height={40}
					handleGetImage={editToolActions.setProjectBanner}
				/>

				<Stack>
					<Text fontSize={12}>Upload image (jpg, png)</Text>
					<Text fontSize={11} marginTop={2} color="#566674">
						332 x 133px. File limit: 1MB
					</Text>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default EditProjectBanner;
