import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { ProjectTool } from 'features/dashboard/EditTool/internal';
import { editToolActions } from 'state/tool';

import ToolBox from '../components/ToolBox';
import ToolDescription from '../components/ToolDescription';
import UploadImage from '../components/UploadImage';

const EditProjectBanner: FC = () => {
	const onTarget = () => editToolActions.setTarget(ProjectTool.banner);

	return (
		<ToolBox onHover={onTarget}>
			<ToolDescription
				name="Banner"
				description="A stunning designed banner to make your project more compelling"
			/>
			<View horizontal style={styles.upload}>
				<UploadImage
					width={74}
					height={40}
					handleGetImage={editToolActions.setProjectBanner}
				/>

				<View style={styles.title}>
					<Text style={styles.uploadTitle}>Upload image (jpg, png)</Text>
					<Text style={styles.uploadDescription}>
						332 x 133px. File limit: 1MB
					</Text>
				</View>
			</View>
		</ToolBox>
	);
};

export default EditProjectBanner;

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
