import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@walless/gui';

interface TagProps {
	text: string;
	color?: string;
	backgroundColor?: string;
}

const Tag: FC<TagProps> = ({
	text,
	color = 'white',
	backgroundColor = '#19232C',
}) => {
	return (
		<View style={[styles.tagContainer, { backgroundColor }]}>
			<Text style={[styles.tagText, { color }]}>{text}</Text>
		</View>
	);
};

interface Props {
	points: number;
	showCompletedTag: boolean;
	showVerifyingTag: boolean;
}

const TaskTags: FC<Props> = ({
	points,
	showCompletedTag,
	showVerifyingTag,
}) => {
	return (
		<View style={styles.tagsContainer}>
			<Tag text={`${points} Points`} />

			{showCompletedTag && (
				<Tag
					text="Completed"
					color="#2EC879"
					backgroundColor="rgba(48, 200, 121, 0.12)"
				/>
			)}

			{showVerifyingTag && (
				<Tag
					text="Verifying"
					color="#FFBE66"
					backgroundColor="rgba(255, 190, 102, 0.12)"
				/>
			)}
		</View>
	);
};

export default TaskTags;

const styles = StyleSheet.create({
	tagsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	tagContainer: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 48,
	},
	tagText: {
		fontSize: 12,
	},
});
