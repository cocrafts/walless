import type { FC } from 'react';
import { Text, View } from '@walless/gui';
import { DetailTool } from 'features/dashboard/EditTool/internal';
import { editToolActions } from 'state/tool';

import ToolDescription from '../components/ToolDescription';
import UploadImage from '../components/UploadImage';

const EditDetailIcon: FC = () => {
	const onTarget = () => editToolActions.setTarget(DetailTool.icon);

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
					handleGetImage={editToolActions.setDetailIcon}
				/>

				<View>
					<Text>Upload image (jpg, png)</Text>
					<Text>130 x 130px. File limit: 200 KB</Text>
				</View>
			</View>
		</View>
	);
};

export default EditDetailIcon;
