import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewStyle,
} from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import type {
	CustomWalletMetadata,
	Token,
	WidgetStoreOptions,
} from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider, SliderTabs } from '@walless/gui';
import type { TabAble, TabItemStyle } from '@walless/gui/components/SliderTabs';
import type {
	NftDocument,
	TokenDocument,
	WidgetDocument,
} from '@walless/store';
import { showCopiedModal } from 'modals/Notification';
import {
	getTokenValue,
	useOpacityAnimated,
	usePublicKeys,
	useWidgets,
} from 'utils/hooks';
import { copy } from 'utils/system';
import { filterByOwnedNfts, filterByOwnedTokens } from 'utils/widget';

import CollectibleList from '../../../components/CollectibleList';
import TokenList from '../../../components/TokenList';
import ActivityTab from '../BuiltInNetwork/ActivityTab';
import type { CardSkin } from '../BuiltInNetwork/WalletCard';
import { WalletCard } from '../BuiltInNetwork/WalletCard';

import Advertisement from './Advertisement';
import FeatureButtons from './FeatureButtons';
import { layoutTabs } from './shared';

interface Props {
	id: string;
}

const convertCustomMetadataToCardSkin = (
	customWalletMetadata: CustomWalletMetadata,
	storeMeta?: WidgetStoreOptions,
): CardSkin => {
	const backgroundSrc = { uri: customWalletMetadata.coverBanner };
	const iconSrc = { uri: customWalletMetadata.iconSrc };
	const iconSize = storeMeta?.iconSize || 26;
	const iconColor = storeMeta?.iconColor || '#ffffff';

	return {
		backgroundSrc,
		iconSrc,
		iconSize,
		iconColor,
	};
};

export const CustomWalletLayout: FC<Props> = ({ id }) => {
	const customWalletWidget = useWidgets().find((item) => item._id === id);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [headerLayout, setHeaderLayout] = useState<LayoutRectangle>();
	const customWalletMetadata =
		customWalletWidget?.metadata as CustomWalletMetadata;

	const network = customWalletMetadata.network;

	console.log(customWalletMetadata);

	const keys = usePublicKeys(network);
	const filteredTokens = filterByOwnedTokens(
		customWalletWidget as WidgetDocument,
	);

	const filteredNfts = filterByOwnedNfts(customWalletWidget as WidgetDocument);

	const valuation = (filteredTokens as TokenDocument<Token>[])?.reduce(
		(accumulator, token) => accumulator + getTokenValue(token, 'usd'),
		0,
	);
	const cardSkin = convertCustomMetadataToCardSkin(
		customWalletMetadata,
		customWalletWidget?.storeMeta,
	);
	const opacityAnimated = useOpacityAnimated({ from: 0, to: 1 });

	const container: ViewStyle = {
		...styles.container,
	};

	const bottomSliderItems: SlideOption[] = useMemo(() => {
		return [
			{
				id: 'tokens',
				component: () => (
					<TokenList
						tokens={filteredTokens as TokenDocument<Token>[]}
						style={styles.tokenListContainer}
					/>
				),
			},
			{
				id: 'collectibles',
				component: () => (
					<CollectibleList nfts={filteredNfts as NftDocument[]} />
				),
			},
			{
				id: 'activities',
				component: () => <ActivityTab network={network} />,
			},
		];
	}, []);

	const activatedStyle = customWalletMetadata.activeTabStyle;

	const deactivatedStyle: TabItemStyle = {
		style: { backgroundColor: 'transparent' },
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
		<Animated.View
			style={[
				container,
				opacityAnimated.style,
				{ backgroundColor: customWalletMetadata.backgroundColor },
			]}
		>
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

			{activeTabIndex === 0 && (
				<Advertisement ads={customWalletMetadata.advertisements} />
			)}
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
		minHeight: 200,
		overflow: 'hidden',
	},
	tokenListContainer: {
		marginVertical: 16,
		overflow: 'hidden',
	},
});
