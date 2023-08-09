import type { FC } from 'react';
import { Text, View } from '@walless/gui';
import { ProjectTool } from 'features/dashboard/EditTool/internal';
import { editToolActions } from 'state/tool';

import ToolDescription from '../components/ToolDescription';
import UploadImage from '../components/UploadImage';

const EditProjectBanner: FC = () => {
	const onTarget = () => editToolActions.setTarget(ProjectTool.banner);

	return (
		<View onTouchStart={onTarget} onTouchEnd={editToolActions.unsetTarget}>
			<ToolDescription
				name="Banner"
				description="A stunning designed banner to make your project more compelling"
			/>
			<View horizontal>
				<UploadImage
					width={74}
					height={40}
					handleGetImage={editToolActions.setProjectBanner}
				/>

				<View>
					<Text>Upload image (jpg, png)</Text>
					<Text>332 x 133px. File limit: 1MB</Text>
				</View>
			</View>
		</View>
	);
};

export default EditProjectBanner;
