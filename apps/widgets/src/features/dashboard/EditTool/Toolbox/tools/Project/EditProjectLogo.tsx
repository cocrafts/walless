import type { FC } from 'react';
import { Text, View } from '@walless/gui';
import { ProjectTool } from 'features/dashboard/EditTool/internal';
import { editToolActions } from 'state/tool';

import ToolDescription from '../components/ToolDescription';
import UploadImage from '../components/UploadImage';

const EditProjectAvatar: FC = () => {
	const onTarget = () => editToolActions.setTarget(ProjectTool.logo);

	return (
		<View onTouchStart={onTarget} onTouchEnd={editToolActions.unsetTarget}>
			<ToolDescription
				name="Logo/Icon"
				description="Your project official logo/icon"
			/>
			<View horizontal>
				<UploadImage
					width={40}
					height={40}
					handleGetImage={editToolActions.setProjectLogo}
				/>

				<View>
					<Text>Upload image (jpg, png)</Text>
					<Text>50 x 50px. File limit: 200 KB</Text>
				</View>
			</View>
		</View>
	);
};

export default EditProjectAvatar;
