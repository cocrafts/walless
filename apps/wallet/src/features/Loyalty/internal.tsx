import { Image, StyleSheet } from 'react-native';
import type { Action, ActionCount, ActionRecord } from '@walless/graphql';
import type { ActionMetadata, UserProgress } from '@walless/graphql';
import { ActionCategory } from '@walless/graphql';
import {
	DiscordColorful,
	TelegramColorful,
	WallessColorful,
	XMonochrome,
} from '@walless/icons';
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
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 16,
		height: 16,
		borderRadius: 8,
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
		if (meta.value) {
			extractedMetadata[meta.key as keyof typeof extractedMetadata] =
				meta.value;
		}
	}

	return extractedMetadata;
};

export const getActionLogo = (action: Action) => {
	if (
		action.type?.toLowerCase().includes('twitter') ||
		action.type?.toLowerCase() === 'x'
	) {
		return <XMonochrome size={24} />;
	}

	if (action.type?.toLowerCase().includes('discord')) {
		return <DiscordColorful size={24} />;
	}

	if (action.type?.toLowerCase().includes('telegram')) {
		return <TelegramColorful size={24} />;
	}

	if (action.type?.toLowerCase() === 'open chest') {
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

	const extractedMetadata = extractDataFromMetadata(
		action.metadata as ActionMetadata[],
	);

	if (extractedMetadata.partnerIcon) {
		return (
			<Image
				source={{ uri: extractedMetadata.partnerIcon }}
				style={{ width: 24, height: 24 }}
				resizeMode="cover"
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
						screen: 'Default',
						params: { id: 'pixeverse' },
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
						screen: 'Default',
						params: { id: 'solana' },
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
