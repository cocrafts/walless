import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import type {
	Action,
	ActionCount,
	ActionMetadata,
	Progress,
	Record,
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
	const { progress } = useSnapshot(loyaltyState);
	const { name, desc, icon, ctaText, ctaType, cta } = useMemo(() => {
		return extractDataFromMetadata(action.metadata as ActionMetadata[]);
	}, [action]);

	const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

	useEffect(() => {
		if (
			!progress ||
			canUserPerformAction ||
			action.category !== ActionCategory.Recurring ||
			!action.cycleInHours
		) {
			return;
		}

		const interval = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev === null) {
					const lastRecord = (progress.records as Record[]).findLast(
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
				}

				if (prev <= 0) {
					return null;
				}

				return prev - 1000;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [progress, action, canUserPerformAction]);

	const FallbackIcon = getIconByType(action.type || '');

	const handlePerformAction = async () => {
		if (ctaType === 'internal') {
			navigateInternalByCta(cta);
			return;
		}

		if (ctaType === 'external') {
			Linking.openURL(cta);
		}

		if (ctaType === '' || action.mechanism === VerifyMechanism.No) {
			try {
				await qlClient.request(mutations.performLoyaltyAction, {
					actionId: action.id,
				});

				const { loyaltyProgress } = await qlClient.request<{
					loyaltyProgress: Progress;
				}>(queries.loyaltyProgress);

				loyaltyActions.setProgress(loyaltyProgress);
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
	};

	const stat = (progress?.trackList as ActionCount[]).find(
		(track) => track.type === action.type,
	);

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

	return (
		<View
			style={[
				styles.container,
				!canUserPerformAction && styles.performedContainerBackground,
				style,
			]}
		>
			<View style={styles.leftContainer}>
				{icon ? (
					<Image source={{ uri: icon }} style={styles.image} />
				) : (
					FallbackIcon
				)}

				<View style={{ flex: 1, gap: 4 }}>
					<View style={styles.titleContainer}>
						<Text style={styles.nameText}>{name}</Text>

						{timeRemaining && (
							<Text style={styles.counterText}>
								{Math.floor(
									(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
								)}
								h:
								{Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))}
								m:
								{Math.floor((timeRemaining % (1000 * 60)) / 1000)}s
							</Text>
						)}
					</View>

					{action.category === ActionCategory.Streak && action.streak && (
						<StreakBar
							streak={action.streak}
							currentStreak={currentStreak}
							style={{
								marginTop: 4,
							}}
						/>
					)}

					<View style={styles.descContainer}>
						<Text
							style={styles.descText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							{desc}
						</Text>

						{action.category === ActionCategory.Streak && (
							<Text style={styles.descText}>
								{currentStreak}/{action.streak}
							</Text>
						)}

						{action.category === ActionCategory.Milestone && (
							<Text style={styles.descText}>
								{stat?.milestone || 0}/{action.milestone}
							</Text>
						)}
					</View>
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#29323A',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 10,
		gap: 32,
	},
	performedContainerBackground: {
		backgroundColor: '#19232C',
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
	counterText: {
		fontSize: 11,
		fontWeight: '500',
		color: '#00B1FF',
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
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 0,
	},
	performedCtaButton: {
		backgroundColor: '#162E3D',
	},
});

export default ActionCard;
