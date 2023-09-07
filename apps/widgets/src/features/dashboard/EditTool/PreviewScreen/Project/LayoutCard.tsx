import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Plus } from '@walless/icons';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

import { ProjectTool } from '../../internal';
import HighlightWrapper from '../components/TargetWrapper';

const LayoutCard: FC = () => {
	const { tools } = useSnapshot(appState);
	const project = tools.project;

	return (
		<View style={styles.container}>
			<HighlightWrapper highlighted={tools.target === ProjectTool.banner}>
				<Image style={styles.banner} source={{ uri: project.banner }} />
			</HighlightWrapper>

			<View style={styles.content}>
				<HighlightWrapper highlighted={tools.target === ProjectTool.logo}>
					<Image style={styles.icon} source={{ uri: project.logo }} />
				</HighlightWrapper>

				<HighlightWrapper highlighted={tools.target === ProjectTool.name}>
					<Text style={styles.projectName}>
						{!project.name ? 'Project name' : project.name}
					</Text>
				</HighlightWrapper>

				<HighlightWrapper
					highlighted={tools.target === ProjectTool.description}
				>
					<Text style={styles.description}>
						{project.description === ''
							? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
							: project.description}
					</Text>
				</HighlightWrapper>

				<View style={styles.bottom}>
					<Text style={styles.bottomText}>♥ 100 Love</Text>
					<Text style={styles.bottomText}>200 Active</Text>
					<Button style={styles.addButton}>
						<Plus size={12} />
					</Button>
				</View>
			</View>
		</View>
	);
};

export default LayoutCard;

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		backgroundColor: '#19232c',
		overflow: 'hidden',
	},
	banner: {
		height: 133,
		resizeMode: 'cover',
	},
	content: {
		marginTop: -26,
		padding: 10,
		gap: 4,
	},
	icon: {
		width: 32,
		height: 32,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#131C24',
	},
	projectName: {
		fontSize: 14,
		fontWeight: '600',
		color: '#ffffff',
	},
	description: {
		fontSize: 12,
		lineHeight: 18,
		fontWeight: '400',
		color: '#566674',
		flexWrap: 'wrap',
		marginTop: 4,
	},
	bottom: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
	},
	bottomText: { fontSize: 12 },
	addButton: {
		marginLeft: 'auto',
		paddingHorizontal: 6,
		paddingVertical: 6,
		borderRadius: 6,
	},
});
