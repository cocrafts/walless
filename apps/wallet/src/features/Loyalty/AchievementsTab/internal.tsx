import { Image } from 'react-native';
import type { ActionMetadata } from '@walless/graphql';
import {
	DiscordMonochrome,
	WallessMonochrome,
	XMonochrome,
} from '@walless/icons';
import { mockWidgets } from 'state/widget';
import assets from 'utils/assets';
import { navigate } from 'utils/navigation';
import { addWidgetToStorage } from 'utils/storage';

export interface ExtractedMetadata {
	name: string;
	desc: string;
	icon: string;
	cta: string;
	ctaText: string;
	ctaType: 'internal' | 'external';
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
		ctaType: 'internal',
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
			extractedMetadata.ctaType = meta.value as ExtractedMetadata['ctaType'];
		}
	}

	return extractedMetadata;
};

export const getIconByType = (type: string) => {
	if (type.toLowerCase().includes('twitter')) {
		return <XMonochrome size={24} />;
	}

	if (type.toLowerCase().includes('discord')) {
		return <DiscordMonochrome size={24} />;
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

	return <WallessMonochrome size={24} />;
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
