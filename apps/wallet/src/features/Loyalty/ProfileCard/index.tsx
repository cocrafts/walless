import type { FC } from 'react';
import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { LoyaltyProfile } from '@walless/graphql';
import { Text } from '@walless/gui';
import { BlingBling, Check, Ranking, Star } from '@walless/icons';
import { sharedStyles } from 'utils/style';

import { levelsByPoints, progressBarHeight } from '../constants';

import InfoCard from './InfoCard';

interface Props {
	profile: LoyaltyProfile;
	containerStyle?: ViewStyle;
}

const ProfileCard: FC<Props> = ({ profile, containerStyle }) => {
	const level = useMemo(() => {
		for (let i = 1; i < levelsByPoints.length; i++) {
			if ((profile.totalPoints || 0) < levelsByPoints[i]) return i - 1;
		}
		return levelsByPoints.length - 1;
	}, [profile.totalPoints]);

	const activeProgressBarPercent = useMemo(() => {
		if (level + 1 === levelsByPoints.length) {
			return '100';
		}

		const currentLevelGap = levelsByPoints[level + 1] - levelsByPoints[level];

		const percent =
			((profile.totalPoints || 0) - levelsByPoints[level]) / currentLevelGap;

		return (percent * 100).toFixed(0);
	}, [profile.totalPoints, level]);

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={sharedStyles.gap8}>
				<View style={sharedStyles.flexRowBetween}>
					<Text style={sharedStyles.fontSize16}>Level progress</Text>
					<Text>
						{level + 1 < levelsByPoints.length
							? `Goal ${levelsByPoints[level + 1]} Points`
							: 'Max level'}
					</Text>
				</View>

				<View style={styles.progressBar}>
					<View
						style={[
							styles.progressBar,
							styles.activeProgressBar,
							{ width: `${activeProgressBarPercent}%` },
						]}
					/>
				</View>

				<View style={sharedStyles.flexRowBetween}>
					<Text style={[sharedStyles.fontSize13, sharedStyles.textBlue]}>
						Level {level}
					</Text>

					{level + 1 < levelsByPoints.length ? (
						<View style={sharedStyles.flexRow}>
							<Text
								style={[sharedStyles.fontSize13, sharedStyles.textNeutral5]}
							>
								{levelsByPoints[level + 1] - (profile.totalPoints || 0)} Points
								to{' '}
							</Text>
							<Text style={[sharedStyles.fontSize13, sharedStyles.textBlue]}>
								Level {level + 1}
							</Text>
						</View>
					) : (
						<View />
					)}
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<InfoCard
					style={styles.infoCardContainer}
					title="Total points"
					value={`${profile.totalPoints || 0}`}
					Icon={BlingBling}
					iconColor="white"
				/>
				<InfoCard
					style={styles.infoCardContainer}
					title="Your ranking"
					value="Coming soon"
					Icon={Ranking}
					iconColor="#F7D570"
				/>
				<InfoCard
					style={styles.infoCardContainer}
					title="Completed quest"
					value={'0'}
					Icon={Check}
					iconColor="#2EC879"
				/>
				<InfoCard
					style={styles.infoCardContainer}
					title="Invited"
					value={'0'}
					Icon={Star}
					iconColor="white"
				/>
			</View>
		</View>
	);
};

export default ProfileCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		padding: 16,
		borderRadius: 16,
		gap: 16,
	},
	progressBar: {
		height: progressBarHeight,
		borderRadius: progressBarHeight / 2,
		backgroundColor: '#1F2A34',
	},
	activeProgressBar: {
		backgroundColor: '#45C5FF',
	},
	bottomContainer: {
		...sharedStyles.flexRowWrap,
		rowGap: 8,
		justifyContent: 'space-between',
	},
	infoCardContainer: {
		width: '49%',
	},
});
