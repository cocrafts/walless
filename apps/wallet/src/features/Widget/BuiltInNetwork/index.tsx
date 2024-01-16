import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewStyle,
} from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Networks } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider, SliderTabs } from '@walless/gui';
import type {
	TabAble,
	TabItemStyle,
} from '@walless/gui/components/SliderTabs/TabItem';
import FeatureButtons from 'components/FeatureButtons';
import { showCopiedModal } from 'modals/Notification';
import { showReceiveModal } from 'modals/Receive';
import { showSendTokenModal } from 'modals/SendToken';
import { buyToken } from 'utils/buy';
import {
	useNfts,
	useOpacityAnimated,
	usePublicKeys,
	useTokens,
} from 'utils/hooks';
import { copy } from 'utils/system';

import ActivityTab from './ActivityTab';
import AptosTokensTab from './AptosTokensTab';
import CollectiblesTab from './CollectiblesTab';
import { getWalletCardSkin, layoutTabs } from './shared';
import TokenTab from './TokenTab';
import WalletCard from './WalletCard';

interface Props {
	id: string;
}

export const BuiltInNetwork: FC<Props> = ({ id }) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const keys = usePublicKeys(id as Networks);
	const [headerLayout, setHeaderLayout] = useState<LayoutRectangle>();
	const { tokens, valuation } = useTokens(id as Networks);
	const { collections } = useNfts(id as Networks);
	const cardSkin = useMemo(() => getWalletCardSkin(id as never), [id]);
	const opacityAnimated = useOpacityAnimated({ from: 0, to: 1 });

	const container: ViewStyle = {
		...styles.container,
	};

	const bottomSliderItems: SlideOption[] = [
		{
			id: 'tokens',
			component: () => <TokenTab tokens={tokens} />,
		},
		{
			id: 'collectibles',
			component: () =>
				id === Networks.aptos ? (
					<AptosTokensTab pubkey={keys[0]._id} />
				) : (
					<CollectiblesTab collections={collections} />
				),
		},
		{
			id: 'activities',
			component: () => <ActivityTab network={id as Networks} />,
		},
	];

	const activatedStyle: TabItemStyle = {
		containerStyle: {
			backgroundColor: '#0694D3',
		},
		textStyle: {
			color: 'white',
			fontWeight: '500',
		},
	};

	const deactivatedStyle: TabItemStyle = {
		containerStyle: {
			backgroundColor: 'transparent',
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

	const handlePressSend = () => {
		showSendTokenModal({ network: id as Networks });
	};

	const handlePressReceive = () => {
		showReceiveModal({ network: id as Networks });
	};

	const handlePressBuy = () => {
		buyToken(id as Networks);
	};

	const handleCopyAddress = (value: string) => {
		copy(value);
		showCopiedModal();
	};

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
					onSendPress={handlePressSend}
					onReceivePress={handlePressReceive}
					onBuyPress={id === Networks.solana ? handlePressBuy : undefined}
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

export default BuiltInNetwork;

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
