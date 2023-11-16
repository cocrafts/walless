import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { CardSkin, TabAble } from '@walless/app';
import {
	MainFeatureButtons,
	SlideHandler,
	TabsHeader,
	WalletCard,
} from '@walless/app';
import { showReceiveModal, showSendModal } from '@walless/app';
import { copy } from '@walless/app/utils';
import {
	usePublicKeys,
	useSettings,
	useTokens,
} from '@walless/app/utils/hooks';
import { Networks } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import { modules } from '@walless/ioc';
import { onrampWithGateFi } from 'utils/gatefi';

import AptosTokensTab from './components/AptosTokensTab';
import { TokenTab } from './components';
import { layoutTabs } from './shared';

const AptosDashboard = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const { setting, setPrivacy } = useSettings();

	const publicKeys = usePublicKeys(Networks.aptos);
	const { tokens, valuation } = useTokens(Networks.aptos);

	const bottomSliderItems: SlideOption[] = [
		{
			id: 'tokens',
			component: () => <TokenTab tokens={tokens} />,
		},
		{
			id: 'collectibles',
			component: () => <AptosTokensTab pubkey={publicKeys[0]._id} />,
		},
		{
			id: 'activities',
			component: () => <ActivityTab network={Networks.aptos} />,
		},
	];

	const handleTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	const handleCopyAddress = async (value: string) => {
		await copy(value, () => <Copy size={18} color="#FFFFFF" />);
	};

	const handleSend = () => {
		showSendModal({ layoutNetwork: Networks.aptos });
	};

	const handleBuy = () => {
		onrampWithGateFi({ wallet: publicKeys[0]._id });
	};

	const handleChangePrivateSetting = (next: boolean) => {
		setPrivacy(next);
	};

	return (
		<View style={styles.container}>
			<View style={styles.walletsContainer}>
				{publicKeys.map((item, index) => (
					<WalletCard
						key={index}
						index={index}
						item={item}
						valuation={valuation}
						skin={makeCardSkin()}
						hideBalance={setting.hideBalance}
						onCopyAddress={handleCopyAddress}
						onChangePrivateSetting={handleChangePrivateSetting}
						width={publicKeys.length == 1 ? 328 : 312}
					/>
				))}
			</View>

			<View style={styles.mainFeaturesContainer}>
				<MainFeatureButtons
					onReceivePress={() => showReceiveModal(Networks.aptos)}
					onSendPress={handleSend}
					onBuyPress={handleBuy}
				/>
				{publicKeys.length > 1 && (
					<SlideHandler items={publicKeys} activeItem={publicKeys[0]} />
				)}
			</View>

			<View style={styles.tabsContainer}>
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
		</View>
	);
};

export default AptosDashboard;

const makeCardSkin = (): CardSkin => {
	return {
		backgroundSrc: modules.asset.widget.aptos.cardBackground,
		iconSrc: modules.asset.widget.aptos.cardIcon,
		largeIconSrc: modules.asset.widget.aptos.cardMark,
		iconColor: '#000000',
		iconSize: 16,
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		gap: 18,
	},
	mainFeaturesContainer: {
		alignItems: 'center',
		gap: 18,
	},
	walletsContainer: {
		flexDirection: 'row',
		gap: 12,
	},
	tabsContainer: {
		flex: 1,
	},
	sliderContainer: {
		flex: 1,
		height: '100%',
	},
});
