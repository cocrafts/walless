import { FC } from 'react';
import { Stack, Text } from '@walless/ui';
import { DetailTool } from 'features/home/EditTool/internal';
import { editToolActions } from 'state/app';

import ToolDescription from '../components/ToolDescription';
import UploadImage from '../components/UploadImage';

const EditDetailIcon: FC = () => {
	const onTarget = () => editToolActions.setTarget(DetailTool.icon);

	return (
		<Stack
			gap={10}
			onHoverIn={onTarget}
			onHoverOut={editToolActions.unsetTarget}
		>
			<ToolDescription
				name="Logo/Icon"
				description="Your project official logo/icon"
			/>
			<Stack flexDirection="row" gap={10} alignItems="center">
				<UploadImage
					width={40}
					height={40}
					handleGetImage={editToolActions.setDetailIcon}
				/>

				<Stack>
					<Text fontSize={12}>Upload image (jpg, png)</Text>
					<Text fontSize={10} color="#566674">
						130 x 130px. File limit: 200 KB
					</Text>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default EditDetailIcon;
