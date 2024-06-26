import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import {
	ActivityIndicator,
	Image,
	Linking,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { logger } from '@walless/core';
import type {
	Action,
	ActionCount,
	ActionMetadata,
	ActionRecord,
	UserProgress,
} from '@walless/graphql';
import {
	ActionCategory,
	mutations,
	queries,
	VerifyMechanism,
} from '@walless/graphql';
import { Button } from '@walless/gui';
import { showNotificationModal } from 'modals/Notification';
import { loyaltyActions, loyaltyState } from 'state/loyalty';
import { qlClient } from 'utils/graphql';
import { useSnapshot } from 'utils/hooks';

import PointTag from '../components/PointTag';
import {
	extractDataFromMetadata,
	getActionLogo,
	getCycleEndTime,
	navigateInternalByCta,
	sharedStyles,
} from '../internal';

import CompletedTag from './CompletedTag';
import CountDown from './CountDown';
import StreakBar from './StreakBar';
import VerificationNeededTag from './VerificationNeededTag';

interface Props {
	style?: ViewStyle;
	action: Action;
	canUserPerformAction: boolean;
}

const ActionCard: FC<Props> = ({ style, action, canUserPerformAction }) => {
	const { userProgress } = useSnapshot(loyaltyState);
	const { name, desc, icon, ctaText, ctaType, cta } = useMemo(() => {
		return extractDataFromMetadata(action.metadata as ActionMetadata[]);
	}, [action]);

	const [isDoingAction, setIsDoingAction] = useState(false);

	const initialTimeRemaining = useMemo<number | null>(() => {
		if (
			!userProgress ||
			canUserPerformAction ||
			action.category !== ActionCategory.Recurring ||
			!action.cycleInHours
		) {
			return null;
		}

		const lastRecord = (userProgress.actionRecords as ActionRecord[]).findLast(
			(record) => record.actionId === action.id,
		);
		if (!lastRecord) {
			return 0;
		}

		const cycleEndTime = getCycleEndTime(
			new Date(lastRecord.timestamp),
			action.cycleInHours as number,
		);

		return cycleEndTime.getTime() - Date.now();
	}, [userProgress]);

	const handleDoAction = async () => {
		if (ctaType === 'internal') {
			navigateInternalByCta(cta);
			return;
		}

		if (ctaType === '' || action.mechanism === VerifyMechanism.No) {
			setIsDoingAction(true);

			try {
				if (action.category === ActionCategory.Onetime) {
					await qlClient.request(mutations.doLoyaltyAction, {
						actionId: action.id,
					});
				} else if (action.category === ActionCategory.Recurring) {
					await qlClient.request(
						mutations.doRecurringThenStreakThenMilestoneActionsByType,
						{
							type: action.type,
						},
					);
				}

				const { loyaltyUserProgress } = await qlClient.request<{
					loyaltyUserProgress: UserProgress;
				}>(queries.loyaltyUserProgress);

				loyaltyActions.setUserProgress(loyaltyUserProgress);
			} catch (error) {
				logger.error(error);

				showNotificationModal({
					id: `action-error-${action.id}`,
					message: `Failed to perform action ${name}`,
					textStyle: {
						color: 'red',
					},
					timeout: 5000,
				});
			}

			setIsDoingAction(false);
		}

		if (ctaType === 'external') {
			Linking.openURL(cta);
		}
	};

	const stat = useMemo(() => {
		if (!userProgress) {
			return null;
		}

		return (userProgress.trackList as ActionCount[]).find(
			(track) => track.type === action.type,
		);
	}, [userProgress]);

	const currentStreak = useMemo(() => {
		if (!stat || !stat.streaks) {
			return 0;
		}

		const cycleEndTime = getCycleEndTime(
			new Date(stat.lastClaim),
			stat.cycleInHours as number,
		);

		cycleEndTime.setHours(
			cycleEndTime.getHours() + (stat.cycleInHours as number),
		);

		if (new Date() > cycleEndTime) {
			return 0;
		}

		let currentStreak = 0;
		for (const streak of stat.streaks) {
			if (streak?.streak === action.streak) {
				currentStreak = streak?.currentStreak ?? 0;
			}
		}
		return currentStreak;
	}, [stat, action.streak]);

	const isPassthrough =
		!canUserPerformAction && action.category !== ActionCategory.Streak;

	return (
		<View style={[styles.container, style]}>
			<View style={{ flex: 1, gap: 8 }}>
				<View
					style={[
						styles.horizontalContainer,
						isPassthrough && styles.passthroughLayout,
					]}
				>
					<View style={styles.imageContainer}>
						{icon ? (
							<Image source={{ uri: icon }} style={styles.image} />
						) : (
							getActionLogo(action)
						)}
					</View>

					<View style={{ gap: 4 }}>
						<Text style={styles.nameText}>{name}</Text>
						{desc !== '' && <Text style={styles.descText}>{desc}</Text>}
					</View>
				</View>

				<View style={[styles.horizontalContainer, { flex: 1 }]}>
					<PointTag
						style={isPassthrough ? styles.passthroughLayout : {}}
						points={action.points!}
					/>

					{!isPassthrough && action.mechanism === VerifyMechanism.Manual && (
						<VerificationNeededTag />
					)}

					{isPassthrough && <CompletedTag style={styles.passthroughLayout} />}

					{initialTimeRemaining && (
						<View style={sharedStyles.tagContainer}>
							<CountDown initialTimeRemaining={initialTimeRemaining} />
						</View>
					)}

					{action.category === ActionCategory.Streak && action.streak && (
						<StreakBar
							streak={action.streak}
							currentStreak={currentStreak}
							isRecorded={!canUserPerformAction}
							style={{ marginLeft: 8, flexGrow: 1 }}
						/>
					)}
				</View>
			</View>

			{canUserPerformAction &&
				action.category !== ActionCategory.Milestone &&
				action.category !== ActionCategory.Streak &&
				(isDoingAction ? (
					<ActivityIndicator
						size="small"
						color="white"
						style={{ marginTop: 4 }}
					/>
				) : (
					<Button
						style={styles.ctaButton}
						title={ctaText || 'Go'}
						titleStyle={styles.ctaText}
						onPress={handleDoAction}
					/>
				))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#19232C',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 12,
		overflow: 'hidden',
		gap: 32,
	},
	passthroughLayout: {
		opacity: 0.5,
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	imageContainer: {
		overflow: 'hidden',
		borderRadius: 4,
	},
	image: {
		width: 24,
		height: 24,
	},
	nameText: {
		fontSize: 11,
		fontWeight: '500',
		color: 'white',
	},
	descText: {
		fontSize: 10,
		color: '#566674',
		maxWidth: 240,
	},
	ctaText: {
		fontSize: 10,
		color: 'white',
	},
	ctaButton: {
		width: 64,
		borderRadius: 32,
		paddingVertical: 4,
		paddingHorizontal: 0,
	},
});

export default ActionCard;
