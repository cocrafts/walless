import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { ProjectTool } from 'features/dashboard/EditTool/internal';
import { editToolActions } from 'state/tool';

import ToolBox from '../components/ToolBox';
import ToolDescription from '../components/ToolDescription';
import UploadImage from '../components/UploadImage';

const EditProjectAvatar: FC = () => {
	const onTarget = () => editToolActions.setTarget(ProjectTool.logo);

	return (
		<ToolBox onHover={onTarget}>
			<ToolDescription
				name="Logo/Icon"
				description="Your project official logo/icon"
			/>
			<View horizontal style={styles.upload}>
				<UploadImage
					width={40}
					height={40}
					handleGetImage={editToolActions.setProjectLogo}
				/>
				<View style={styles.title}>
					<Text style={styles.uploadTitle}>Upload image (jpg, png)</Text>
					<Text style={styles.uploadDescription}>
						50 x 50px. File limit: 200 KB
					</Text>
				</View>
			</View>
		</ToolBox>
	);
};

export default EditProjectAvatar;

const styles = StyleSheet.create({
	upload: {
		gap: 10,
		alignItems: 'center',
	},
	title: { gap: 4 },
	uploadTitle: {
		color: '#ffffff',
		fontSize: 12,
	},
	uploadDescription: {
		color: '#566674',
		fontSize: 12,
	},
});
