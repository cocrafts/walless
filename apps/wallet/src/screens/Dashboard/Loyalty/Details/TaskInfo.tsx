import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import type { LoyaltyProfile, Task } from '@walless/graphql';
import { Text } from '@walless/gui';
import StreakIndicator from 'components/StreakIndicator';
import { formatCountdownTime } from 'utils/format';
import { useCurrentStreak, useRemainingTime } from 'utils/hooks';
import { sharedStyles } from 'utils/style';

interface Props {
	style?: ViewStyle;
	task: Task;
	profile: LoyaltyProfile;
}

const TaskInfo: FC<Props> = ({ style, task, profile }) => {
	const remainingTime = useRemainingTime(profile, task);

	const currentStreak = useCurrentStreak(profile, task);

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.nameText}>
				{task.metadata['name'] || 'Unnamed Task'}
			</Text>

			<View style={styles.infoContainer}>
				<View style={[sharedStyles.gap2, sharedStyles.flexGrow]}>
					<Text style={[sharedStyles.fontSize13, sharedStyles.textNeutral5]}>
						Reward
					</Text>
					<Text style={sharedStyles.textHighlight}>{task.points} points</Text>
				</View>

				{task.interval ? (
					<>
						<View style={styles.separator} />

						<View style={[sharedStyles.gap4, sharedStyles.flexGrow]}>
							<Text
								style={[sharedStyles.fontSize13, sharedStyles.textNeutral5]}
							>
								Countdown
							</Text>
							<Text style={sharedStyles.textHighlight}>
								{remainingTime > 0
									? formatCountdownTime(remainingTime)
									: 'Ready'}
							</Text>
						</View>
					</>
				) : null}

				{task.streak ? (
					<>
						<View style={styles.separator} />

						<View style={[sharedStyles.gap4, sharedStyles.flexGrow]}>
							<Text
								style={[sharedStyles.fontSize13, sharedStyles.textNeutral5]}
							>
								Quest active
							</Text>
							<StreakIndicator
								currentStreak={currentStreak}
								streak={task.streak}
							/>
						</View>
					</>
				) : null}
			</View>

			<View style={styles.descContainer}>
				<Text style={sharedStyles.textNeutral6}>Description</Text>

				{task.metadata['desc'] ? (
					<View style={sharedStyles.gap4}>
						{`${task.metadata['desc']}`.split('\n').map((line, i) => (
							<View key={i} style={styles.lineContainer}>
								<View style={styles.descIndicatorContainer}>
									<Text style={sharedStyles.textCenter}>
										{task.metadata['descIndicator'] === 'dash'
											? '-'
											: `${i + 1}.`}
									</Text>
								</View>
								<Text>{line}</Text>
							</View>
						))}
					</View>
				) : (
					<Text>None</Text>
				)}
			</View>
		</View>
	);
};

export default TaskInfo;

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	nameText: {
		...sharedStyles.textNeutral8,
		fontSize: 18,
	},
	infoContainer: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: '#212835',
		borderRadius: 12,
		gap: 16,
	},
	separator: {
		width: 1,
		height: 24,
		backgroundColor: '#313F4B',
		alignSelf: 'center',
	},
	descContainer: {
		gap: 16,
	},
	descIndicatorContainer: {
		width: 16,
	},
	lineContainer: {
		flexDirection: 'row',
		gap: 4,
	},
});
