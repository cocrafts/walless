import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
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

import CountDown from './CountDown';
import {
	extractDataFromMetadata,
	getCycleEndTime,
	getIconByType,
	navigateInternalByCta,
} from './internal';
import StreakBar from './StreakBar';

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

	const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

	useEffect(() => {
		if (
			!userProgress ||
			canUserPerformAction ||
			action.category !== ActionCategory.Recurring ||
			!action.cycleInHours
		) {
			return;
		}

		const interval = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev === null) {
					const lastRecord = (
						userProgress.actionRecords as ActionRecord[]
					).findLast((record) => record.actionId === action.id);
					if (!lastRecord) {
						return 0;
					}

					const cycleEndTime = getCycleEndTime(
						new Date(lastRecord.timestamp),
						action.cycleInHours as number,
					);

					return cycleEndTime.getTime() - Date.now();
				}

				if (prev <= 0) {
					return null;
				}

				return prev - 1000;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [userProgress, action, canUserPerformAction]);

	const FallbackIcon = getIconByType(action.type || '');

	const handlePerformAction = async () => {
		if (ctaType === 'internal') {
			navigateInternalByCta(cta);
			return;
		}

		if (ctaType === '' || action.mechanism === VerifyMechanism.No) {
			try {
				await qlClient.request(mutations.performLoyaltyAction, {
					actionId: action.id,
				});

				const { loyaltyUserProgress } = await qlClient.request<{
					loyaltyUserProgress: UserProgress;
				}>(queries.loyaltyUserProgress);

				loyaltyActions.setUserProgress(loyaltyUserProgress);
			} catch (error) {
				console.error(error);
				showNotificationModal({
					id: `action-error-${action.id}`,
					message: `Failed to perform action ${name}`,
					textStyle: {
						color: 'red',
					},
					timeout: 5000,
				});
			}
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

		let currentStreak = 0;
		for (const streak of stat.streaks) {
			if (streak?.streak === action.streak) {
				currentStreak = streak?.currentStreak ?? 0;
			}
		}
		return currentStreak;
	}, [stat, action.streak]);

	const showDescContainer: boolean = useMemo(() => {
		if (
			action.category === ActionCategory.Milestone &&
			stat?.milestone &&
			action.milestone
		) {
			return stat.milestone < action.milestone;
		}

		if (action.category === ActionCategory.Streak && action.streak) {
			return true;
		}

		return !!desc;
	}, [desc, stat, action.category]);

	return (
		<View style={[styles.container, style]}>
			<View style={styles.leftContainer}>
				{icon ? (
					<Image source={{ uri: icon }} style={styles.image} />
				) : (
					FallbackIcon
				)}

				<View style={{ flex: 1, gap: 4 }}>
					<View style={styles.titleContainer}>
						<Text style={styles.nameText}>{name}</Text>

						{timeRemaining && <CountDown timeRemaining={timeRemaining} />}
					</View>

					{action.category === ActionCategory.Streak && action.streak && (
						<StreakBar
							streak={action.streak}
							currentStreak={currentStreak}
							style={{ marginTop: 4 }}
						/>
					)}

					{showDescContainer && (
						<View style={styles.descContainer}>
							<Text
								style={styles.descText}
								numberOfLines={2}
								ellipsizeMode="tail"
							>
								{!canUserPerformAction && action.streak ? 'Checked-in' : desc}
							</Text>

							<Text style={styles.descText}>
								{action.category === ActionCategory.Streak &&
									`${currentStreak}/${action.streak}`}

								{action.category === ActionCategory.Milestone &&
									stat?.milestone &&
									action.milestone &&
									stat.milestone < action.milestone &&
									`${stat.milestone || 0}/${action.milestone}`}
							</Text>
						</View>
					)}
				</View>
			</View>

			<View style={styles.rightContainer}>
				<Text style={styles.pointText}>{action.points} points</Text>
				{action.category !== ActionCategory.Milestone &&
					action.category !== ActionCategory.Streak && (
						<Button
							style={[
								styles.ctaButton,
								!canUserPerformAction && styles.performedCtaButton,
							]}
							disabled={!canUserPerformAction}
							title={ctaText || 'Go'}
							titleStyle={styles.pointText}
							onPress={handlePerformAction}
						/>
					)}
			</View>

			{!canUserPerformAction && <View style={styles.performedOverlay} />}
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
	performedOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(67, 82, 95, 0.4)',
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		flex: 1,
	},
	image: {
		width: 24,
		height: 24,
		borderRadius: 4,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	nameText: {
		fontSize: 11,
		fontWeight: '500',
		color: 'white',
	},
	descContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	descText: {
		fontSize: 10,
		color: '#566674',
		maxWidth: 240,
	},
	rightContainer: {
		width: 64,
		alignItems: 'center',
		gap: 4,
	},
	pointText: {
		fontSize: 10,
		color: 'white',
	},
	ctaButton: {
		width: '100%',
		borderRadius: 32,
		paddingVertical: 4,
		paddingHorizontal: 0,
	},
	performedCtaButton: {
		backgroundColor: '#162E3D',
	},
});

export default ActionCard;
