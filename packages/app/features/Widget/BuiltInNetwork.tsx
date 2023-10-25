import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewStyle,
} from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Networks } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider } from '@walless/gui';

import MainFeatureButtons from '../../components/MainFeatureButtons';
import type { TabAble } from '../../components/TabsHeader';
import TabsHeader from '../../components/TabsHeader';
import WalletCard from '../../components/WalletCard';
import { copy } from '../../utils';
import { useNfts, useSafeAreaInsets } from '../../utils/hooks';
import { usePublicKeys, useTokens } from '../../utils/hooks';
import { showReceiveModal, showSendModal } from '../../utils/modal';

import ActivityTab from './components/ActivityTab';
import { CollectiblesTab, TokenTab } from './components';
import { getWalletCardSkin, layoutTabs } from './shared';

interface Props {
	id: string;
}

export const BuiltInNetwork: FC<Props> = ({ id }) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const insets = useSafeAreaInsets();
	const keys = usePublicKeys(id as Networks);
	const [headerLayout, setHeaderLayout] = useState<LayoutRectangle>();
	const { tokens, valuation } = useTokens(id as Networks);
	const { collections } = useNfts(Networks.solana);
	const cardSkin = useMemo(() => getWalletCardSkin(id as never), [id]);

	const container: ViewStyle = {
		marginTop: insets.top,
		...styles.container,
	};

	const bottomSliderItems: SlideOption[] = [
		{
			id: 'tokens',
			component: () => <TokenTab tokens={tokens} />,
		},
		{
			id: 'collectibles',
			component: () => <CollectiblesTab collections={collections} />,
		},
		{
			id: 'activities',
			component: () => <ActivityTab network={id as Networks} />,
		},
	];

	const handleTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	const onHeaderLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setHeaderLayout(nativeEvent.layout);
	};

	const handlePressSend = () => {
		showSendModal({
			layoutNetwork: id as Networks,
		});
	};

	const handlePressReceive = () => {
		showReceiveModal(id as Networks);
	};

	return (
		<View style={container}>
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
								onCopyAddress={copy}
							/>
						);
					})}

				<MainFeatureButtons
					onSendPress={handlePressSend}
					onReceivePress={handlePressReceive}
				/>
			</View>

			<TabsHeader
				items={layoutTabs}
				activeItem={layoutTabs[activeTabIndex]}
				onTabPress={handleTabPress}
			/>

			<Slider
				style={styles.sliderContainer}
				items={bottomSliderItems}
				activeItem={bottomSliderItems[activeTabIndex]}
			/>
		</View>
	);
};

export default BuiltInNetwork;

const headingSpacing = 18;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 32,
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
