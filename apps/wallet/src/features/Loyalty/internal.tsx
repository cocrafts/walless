import { Image, StyleSheet } from 'react-native';
import type { Action, ActionCount, ActionRecord } from '@walless/graphql';
import type { ActionMetadata, UserProgress } from '@walless/graphql';
import { ActionCategory } from '@walless/graphql';
import { DiscordColorful, WallessColorful, XMonochrome } from '@walless/icons';
import { mockWidgets } from 'state/widget';
import assets from 'utils/assets';
import { navigate } from 'utils/navigation';
import { addWidgetToStorage } from 'utils/storage';

export const sharedStyles = StyleSheet.create({
	tagContainer: {
		backgroundColor: '#2C353D',
		height: 24,
		borderRadius: 8,
		paddingHorizontal: 4,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 4,
	},
});

export interface ExtractedMetadata {
	name: string;
	desc: string;
	icon: string;
	cta: string;
	ctaText: string;
	ctaType: string;
	partner: string;
	partnerDesc: string;
	partnerIcon: string;
	partnerThumbnail: string;
}

export const extractDataFromMetadata = (
	metadata: ActionMetadata[],
): ExtractedMetadata => {
	const extractedMetadata: ExtractedMetadata = {
		name: '',
		desc: '',
		icon: '',
		cta: '',
		ctaText: '',
		ctaType: '',
		partner: '',
		partnerDesc: '',
		partnerIcon: '',
		partnerThumbnail: '',
	};

	for (const meta of metadata) {
		if (meta.key === 'name' && meta.value) {
			extractedMetadata.name = meta.value;
		} else if (meta.key === 'desc' && meta.value) {
			extractedMetadata.desc = meta.value;
		} else if (meta.key === 'icon' && meta.value) {
			extractedMetadata.icon = '';
		} else if (meta.key === 'cta' && meta.value) {
			extractedMetadata.cta = meta.value;
		} else if (meta.key === 'ctaText' && meta.value) {
			extractedMetadata.ctaText = meta.value;
		} else if (meta.key === 'ctaType' && meta.value) {
			extractedMetadata.ctaType = meta.value;
		} else if (meta.key === 'partner' && meta.value) {
			extractedMetadata.partner = meta.value;
		} else if (meta.key === 'partnerDesc' && meta.value) {
			extractedMetadata.partnerDesc = meta.value;
		} else if (meta.key === 'partnerIcon' && meta.value) {
			extractedMetadata.partnerIcon = meta.value;
		} else if (meta.key === 'partnerThumbnail' && meta.value) {
			extractedMetadata.partnerThumbnail = meta.value;
		}
	}

	return extractedMetadata;
};

export const getIconByType = (type: string) => {
	if (type.toLowerCase().includes('twitter')) {
		return <XMonochrome size={24} />;
	}

	if (type.toLowerCase().includes('discord')) {
		return <DiscordColorful size={24} />;
	}

	if (type.toLowerCase() === 'open chest') {
		return (
			<Image
				source={assets.widget.pixeverse.storeMeta.iconUri}
				style={{
					width: 24,
					height: 24,
					borderRadius: 4,
				}}
			/>
		);
	}

	return <WallessColorful size={24} />;
};

export const navigateInternalByCta = (cta: string) => {
	switch (cta) {
		case 'referral':
			navigate('Dashboard', {
				screen: 'Setting',
				params: {
					screen: 'Referral',
				},
			});
			break;

		case 'pixeverse': {
			const pixeverseWidget = mockWidgets.find(
				(widget) => widget._id === 'pixeverse',
			);
			if (pixeverseWidget) {
				addWidgetToStorage(pixeverseWidget._id, pixeverseWidget);
			}
			navigate('Dashboard', {
				screen: 'Explore',
				params: {
					screen: 'Widget',
					params: {
						id: 'pixeverse',
					},
				},
			});
			break;
		}

		case 'swap': {
			const solanaWidget = mockWidgets.find(
				(widget) => widget._id === 'solana',
			);
			if (solanaWidget) {
				addWidgetToStorage(solanaWidget._id, solanaWidget);
			}
			navigate('Dashboard', {
				screen: 'Explore',
				params: {
					screen: 'Widget',
					params: {
						id: 'solana',
					},
				},
			});
			break;
		}

		default:
			break;
	}
};

export const getCycleEndTime = (actionTime: Date, cycle: number): Date => {
	const actionDate = new Date(actionTime.getTime() + cycle * 60 * 60 * 1000);

	const cycleEndTimeInUTC = new Date(
		actionDate.setUTCHours(
			Math.floor(actionDate.getUTCHours() / cycle) * cycle,
			0,
			0,
			0,
		),
	);

	return cycleEndTimeInUTC;
};

export const formatCountdownTime = (timeRemaining: number) => {
	const hours = Math.floor(
		(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	);
	const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
	return `${hours}h:${minutes}m:${seconds}s`;
};

export const canUserPerformAction = (
	userProgress: UserProgress,
	action: Action,
) => {
	if (!userProgress) {
		return false;
	}

	if (
		action.category === ActionCategory.Onetime ||
		action.category === ActionCategory.Milestone
	) {
		return !(userProgress.actionRecords as ActionRecord[]).some(
			(record) => record.actionId === action.id,
		);
	}

	if (action.category === ActionCategory.Recurring) {
		if (!action.cycleInHours) {
			return true;
		}

		const lastRecord = (userProgress.actionRecords as ActionRecord[]).findLast(
			(record) => record.actionId === action.id,
		);
		if (!lastRecord) {
			return true;
		}

		const cycleEndTime = getCycleEndTime(
			new Date(lastRecord.timestamp),
			action.cycleInHours,
		);

		return new Date() >= cycleEndTime;
	}

	if (action.category === ActionCategory.Streak) {
		const actionCount = userProgress.trackList?.find(
			(track) => (track as ActionCount).type === action.type,
		);
		if (!actionCount || !actionCount.cycleInHours) {
			return true;
		}

		const cycleEndTime = getCycleEndTime(
			new Date(actionCount.lastClaim),
			actionCount.cycleInHours as number,
		);

		return new Date() >= cycleEndTime;
	}

	return false;
};
