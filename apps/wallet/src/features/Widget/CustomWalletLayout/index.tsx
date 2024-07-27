import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewStyle,
} from 'react-native';
import { Platform, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import type { CustomWalletMetadata } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider, SliderTabs } from '@walless/gui';
import type { TabAble, TabItemStyle } from '@walless/gui/components/SliderTabs';
import { showCopiedModal } from 'modals/Notification';
import { mockWidgets } from 'state/widget';
import { getTokenValue, useOpacityAnimated, usePublicKeys } from 'utils/hooks';
import { copy } from 'utils/system';

import ActivityTab from '../BuiltInNetwork/ActivityTab';
import TokenTab from '../BuiltInNetwork/TokenTab';
import type { CardSkin } from '../BuiltInNetwork/WalletCard';
import { WalletCard } from '../BuiltInNetwork/WalletCard';

import FeatureButtons from './FeatureButtons';
import NftTab from './NftTab';
import { layoutTabs } from './shared';

interface Props {
	id: string;
}

const convertCustomMetadataToCardSkin = (
	customWalletMetadata: CustomWalletMetadata,
): CardSkin => {
	let backgroundSrc = require(customWalletMetadata.coverBanner);
	let iconSrc = require(customWalletMetadata.iconSrc);
	if (Platform.OS == 'web') {
		backgroundSrc = { uri: customWalletMetadata.coverBanner };
		iconSrc = { uri: customWalletMetadata.iconSrc };
	}

	return {
		backgroundSrc,
		iconSrc,
		iconSize: 40,
		iconColor: '#ffffff',
	};
};

export const CustomWalletLayout: FC<Props> = ({ id }) => {
	const customWalletWidget = mockWidgets.find((item) => item._id === id);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const customWalletMetadata =
		customWalletWidget?.customMetadata as CustomWalletMetadata;

	const network = customWalletMetadata.network;
	const tokens = customWalletMetadata.tokens;
	const requiredNfts = customWalletMetadata.nfts;

	const keys = usePublicKeys(network);
	const [headerLayout, setHeaderLayout] = useState<LayoutRectangle>();
	const valuation = tokens?.reduce(
		(accumulator, token) => accumulator + getTokenValue(token, 'usd'),
		0,
	);
	const cardSkin = convertCustomMetadataToCardSkin(customWalletMetadata);
	const opacityAnimated = useOpacityAnimated({ from: 0, to: 1 });

	const container: ViewStyle = {
		...styles.container,
	};

	const bottomSliderItems: SlideOption[] = useMemo(() => {
		return [
			{
				id: 'tokens',
				component: () => <TokenTab network={network} tokens={tokens} />,
			},
			{
				id: 'collectibles',
				component: () => (
					<NftTab network={network} requiredNfts={requiredNfts} />
				),
			},
			{
				id: 'activities',
				component: () => <ActivityTab network={network} />,
			},
		];
	}, []);

	const activatedStyle: TabItemStyle = {
		containerStyle: customWalletMetadata.activeTabStyle,
		textStyle: {
			color: 'white',
			fontWeight: '500',
		},
	};

	const deactivatedStyle: TabItemStyle = {
		containerStyle: {
			style: { backgroundColor: 'transparent' },
		},
		textStyle: {
			color: '#566674',
			fontWeight: '400',
		},
	};

	const handleTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	const onHeaderLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setHeaderLayout(nativeEvent.layout);
	};

	const handleCopyAddress = (value: string) => {
		copy(value);
		showCopiedModal();
	};

	if (!customWalletWidget) return null;

	return (
		<Animated.View style={[container, opacityAnimated.style]}>
			<View style={styles.headerContainer} onLayout={onHeaderLayout}>
				{headerLayout?.width &&
					keys.map((item, index) => {
						return (
							<WalletCard
								key={index}
								index={index}
								item={item}
								valuation={valuation}
								skin={cardSkin}
								hideBalance={false}
								width={headerLayout.width}
								onCopyAddress={handleCopyAddress}
							/>
						);
					})}

				<FeatureButtons
					buy={customWalletMetadata.actionButtonBackgroundColors.buy}
					send={customWalletMetadata.actionButtonBackgroundColors.send}
					receive={customWalletMetadata.actionButtonBackgroundColors.receive}
					swap={customWalletMetadata.actionButtonBackgroundColors.swap}
					network={network}
				/>
			</View>

			<SliderTabs
				items={layoutTabs}
				activeItem={layoutTabs[activeTabIndex]}
				onTabPress={handleTabPress}
				activatedStyle={activatedStyle}
				deactivatedStyle={deactivatedStyle}
			/>

			<Slider
				style={styles.sliderContainer}
				items={bottomSliderItems}
				activeItem={bottomSliderItems[activeTabIndex]}
			/>
		</Animated.View>
	);
};

export default CustomWalletLayout;

const headingSpacing = 18;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 12,
		paddingHorizontal: 18,
	},
	headerContainer: {
		alignItems: 'center',
		gap: headingSpacing,
		paddingBottom: headingSpacing,
	},
	sliderContainer: {
		flex: 1,
		overflow: 'hidden',
	},
});
