import type { FC } from 'react';
import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import type { Action, ActionMetadata, Progress } from '@walless/graphql';
import {
	ActionCategory,
	mutations,
	queries,
	VerifyMechanism,
} from '@walless/graphql';
import { Button } from '@walless/gui';
import { showNotificationModal } from 'modals/Notification';
import { loyaltyActions } from 'state/loyalty';
import { qlClient } from 'utils/graphql';

import {
	extractDataFromMetadata,
	getIconByType,
	navigateInternalByCta,
} from './internal';

interface Props {
	style?: ViewStyle;
	action: Action;
	isPerformed: boolean;
}

const ActionCard: FC<Props> = ({ style, action, isPerformed }) => {
	const { name, desc, icon, ctaText, ctaType, cta } = useMemo(() => {
		return extractDataFromMetadata(action.metadata as ActionMetadata[]);
	}, [action]);

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

	return (
		<View
			style={[
				styles.container,
				isPerformed && styles.performedContainerBackground,
				style,
			]}
		>
			<View style={styles.leftContainer}>
				{icon ? (
					<Image source={{ uri: icon }} style={styles.image} />
				) : (
					FallbackIcon
				)}
				<View>
					<View style={styles.titleContainer}>
						<Text style={styles.nameText}>{name}</Text>
						{isPerformed && action.type === ActionCategory.Recurring && (
							<Text style={styles.counterText}>{action.cycleInHours}</Text>
						)}
					</View>
					{action.category === ActionCategory.Milestone ||
					action.category === ActionCategory.Streak ? (
						<View />
					) : (
						<Text>{desc}</Text>
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
								isPerformed && styles.performedCtaButton,
							]}
							disabled={isPerformed}
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
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#29323A',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 10,
	},
	performedContainerBackground: {
		backgroundColor: '#19232C',
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
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
	counterText: {
		fontSize: 11,
		fontWeight: '500',
		color: '#00B1FF',
	},
	nameText: {
		fontSize: 11,
		fontWeight: '500',
		color: 'white',
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
