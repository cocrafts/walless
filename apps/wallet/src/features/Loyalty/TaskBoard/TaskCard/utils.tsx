import type { ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import type { Task } from '@walless/graphql';
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
import { sharedStyles } from 'utils/style';

export const countdownHeight = 26;

export const getTaskLogo = (task: Task) => {
	let imageSource: ImageSourcePropType | null = null;

	const cta = `${task.metadata['cta'] || ''}`;

	if (task.metadata['logo']) {
		imageSource = { uri: task.metadata['logo'] };
	} else if (task.metadata['partnerLogo']) {
		imageSource = { uri: task.metadata['partnerLogo'] };
	} else if (task.metadata['partnerIcon']) {
		imageSource = { uri: task.metadata['partnerIcon'] };
	} else if (cta.toLowerCase().includes('pixeverse')) {
		imageSource = assets.widget.pixeverse.storeMeta.iconUri;
	}

	if (imageSource !== null) {
		return (
			<Image style={styles.taskLogo} resizeMode="cover" source={imageSource} />
		);
	}

	let svgSource: ReactNode = <WallessColorful size={24} />;

	if (
		cta.toLowerCase().includes('https://x.com') ||
		cta.toLowerCase().includes('https://twitter.com')
	) {
		svgSource = <XMonochrome size={24} />;
	} else if (cta.toLowerCase().includes('telegram')) {
		svgSource = <TelegramColorful size={24} />;
	} else if (cta.toLowerCase().includes('discord')) {
		svgSource = <DiscordColorful size={24} />;
	}

	return (
		<View style={[styles.taskLogo, sharedStyles.flexCenter]}>{svgSource}</View>
	);
};

const styles = StyleSheet.create({
	taskLogo: {
		backgroundColor: 'white',
		width: 24,
		height: 24,
		borderRadius: 12,
		overflow: 'hidden',
	},
});

export const navigateInternalByCta = (cta: string) => {
	if (cta === 'referral') {
		navigate('Dashboard', {
			screen: 'Setting',
			params: {
				screen: 'Referral',
			},
		});
	} else if (cta === 'pixeverse') {
		const pixeverseWidget = mockWidgets.find(
			(widget) => widget._id === 'pixeverse',
		);
		if (pixeverseWidget) {
			addWidgetToStorage(pixeverseWidget._id, pixeverseWidget);
		}
		navigate('Dashboard', {
			screen: 'Explore',
			params: { screen: 'Widget', params: { id: 'pixeverse' } },
		});
	} else if (cta === 'swap') {
		const solanaWidget = mockWidgets.find((widget) => widget._id === 'solana');
		if (solanaWidget) {
			addWidgetToStorage(solanaWidget._id, solanaWidget);
		}
		navigate('Dashboard', {
			screen: 'Explore',
			params: { screen: 'Widget', params: { id: 'solana' } },
		});
	}
};

export const getIntervalEndTime = (taskTime: Date, interval: number) => {
	const intervalInMs = interval * 60 * 60 * 1000;

	const roundedTime =
		Math.ceil(taskTime.getTime() / intervalInMs) * intervalInMs;

	return new Date(roundedTime);
};
