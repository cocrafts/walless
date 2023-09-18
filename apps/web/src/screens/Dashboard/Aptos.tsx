import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { SlideOption, Slider, View } from '@walless/gui';
import { useNfts, usePublicKeys, useSettings, useTokens } from 'utils/hooks';
import { CardSkin, TabsHeader, WalletCard } from '@walless/app';
import { appActions } from 'state/app';
import { Copy } from '@walless/icons';
import { layoutTabs } from './shared';
import { useState } from 'react';
import { CollectiblesTab, TokenTab } from './components';
import ActivityTab from './components/ActivityTab';

const AptosDashboard = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const { setting, setPrivacy } = useSettings();

	const publicKeys = usePublicKeys(Networks.aptos);
	const { tokens, valuation } = useTokens(Networks.aptos);
	const { collections } = useNfts(Networks.aptos);

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
	largeIconSrc: { uri: '/img/network/aptos-icon.svg' },
	iconSrc: { uri: '/img/network/aptos-icon.svg' },
	iconColor: '#000000',
	iconSize: 16,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
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
