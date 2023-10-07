import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { CardSkin, TabAble } from '@walless/app';
import {
	MainFeatureButtons,
	SlideHandler,
	TabsHeader,
	WalletCard,
} from '@walless/app';
import { Networks } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import { appActions } from 'state/app';
import { showReceiveModal } from 'state/app/modal';
import { onrampWithGateFi } from 'utils/gatefi';
import { usePublicKeys, useSettings, useTokens } from 'utils/hooks';

import ActivityTab from './components/ActivityTab';
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
			component: () => <AptosTokensTab />,
		},
		{
			id: 'activities',
			component: () => <ActivityTab network={Networks.aptos} />,
		},
	];

	const handleCopyAddress = async (value: string) => {
		await appActions.copy(value, () => <Copy size={18} color="#FFFFFF" />);
	};

	const handleChangePrivateSetting = (next: boolean) => {
		setPrivacy(next);
	};

	const handleTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	const handleSend = () => {
		appActions.showSendModal({ layoutNetwork: Networks.aptos });
	};

	const handleBuy = () => {
		onrampWithGateFi({ wallet: publicKeys[0]._id });
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
						skin={aptosCardSkin}
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

			<View>
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

const aptosCardSkin: CardSkin = {
	backgroundSrc: { uri: '/img/network/sky-card-bg.png' },
	largeIconSrc: { uri: '/img/explore/logo-trans-aptos.svg' },
	iconSrc: { uri: '/img/explore/logo-trans-aptos.svg' },
	iconColor: 'transparent',
	iconSize: 16,
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
	sliderContainer: {
		flex: 1,
		height: '100%',
	},
});
