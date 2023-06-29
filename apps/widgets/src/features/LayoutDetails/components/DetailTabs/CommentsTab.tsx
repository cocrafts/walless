import { type FC } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { type UserProfile } from '@walless/core';
import { Text, View } from '@walless/gui';
import Image from 'next/image';

export interface CommentProps {
	user: UserProfile;
	comment: string;
}

export interface CommentsTabProps {
	comments: CommentProps[];
}

const CommentsTab: FC<CommentsTabProps> = ({ comments }) => {
	return (
		<View style={styles.container}>
			<View>
				<TextInput
					style={styles.commentArea}
					placeholder="Add your comment here"
					placeholderTextColor="#566674"
					multiline={true}
				/>
			</View>

			<View style={styles.separateLine} />

			<ScrollView>
				{comments.map(({ user, comment }, index) => (
					<View key={index}>
						<View style={styles.userDisplayContainer}>
							<Image
								src={user.profileImage ?? ''}
								alt="user profile"
								width={40}
								height={40}
								style={styles.avatar}
							/>

							<Text>{user.name}</Text>
						</View>

						<Text style={styles.comment}>{comment}</Text>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default CommentsTab;

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	commentsListContainer: {
		flex: 1,
	},
	commentArea: {
		flex: 1,
		minWidth: 1000,
		minHeight: 216,
		alignSelf: 'flex-start',
		padding: 20,
		backgroundColor: '#19232C',
		borderRadius: 16,
		color: '#ffffff',
	},
	avatar: {
		borderRadius: 40,
	},
	separateLine: {
		height: 1,
		backgroundColor: '#566674',
	},
	userDisplayContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	comment: {
		marginRight: 60,
	},
});
