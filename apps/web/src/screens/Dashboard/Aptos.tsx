import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { CardSkin, TabAble } from '@walless/app';
import {
	MainFeatures,
	SlideHandler,
	TabsHeader,
	WalletCard,
} from '@walless/app';
import { Networks } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider } from '@walless/gui';
import { Copy } from '@walless/icons';
import { Stack } from '@walless/ui';
import { layoutTabs } from 'screens/Dashboard/shared';
import { appActions } from 'state/app';
import { showReceiveModal } from 'state/app/modal';
import { onrampWithGateFi } from 'utils/gatefi';
import { useNfts, usePublicKeys, useSettings, useTokens } from 'utils/hooks';

import ActivityTab from './components/ActivityTab';
import { CollectiblesTab, TokenTab } from './components';

interface Props {
	variant?: string;
}

export const Dashboard: FC<Props> = () => {
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

	const handleTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	const handleCopyAddress = async (value: string) => {
		await appActions.copy(value, () => <Copy size={18} color="#FFFFFF" />);
	};

	const handleSend = () => {
		appActions.showSendModal({ layoutNetwork: Networks.aptos });
	};

	const handleBuy = () => {
		onrampWithGateFi({ wallet: publicKeys[0]._id });
	};

	const handleChangePrivateSetting = (next: boolean) => {
		setPrivacy(next);
	};

	return (
		<Stack flex={1} padding={12} gap={18}>
			<Stack horizontal gap={12}>
				{publicKeys.map((item, index) => {
					return (
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
					);
				})}
			</Stack>

			<Stack alignItems="center" gap={18}>
				<MainFeatures
					onReceivePress={() => showReceiveModal(Networks.aptos)}
					onSendPress={handleSend}
					onBuyPress={handleBuy}
				/>
				{publicKeys.length > 1 && (
					<SlideHandler items={publicKeys} activeItem={publicKeys[0]} />
				)}
			</Stack>

			<Stack flex={1}>
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
			</Stack>
		</Stack>
	);
};

export default Dashboard;

const aptosCardSkin: CardSkin = {
	backgroundSrc: { uri: '/img/network/sky-card-bg.png' },
	largeIconSrc: { uri: '/img/network/aptos-cover.svg' },
	iconSrc: { uri: '/img/network/aptos-icon.png' },
	iconColor: '#000000',
	iconSize: 16,
};

const styles = StyleSheet.create({
	sliderContainer: {
		flex: 1,
		height: '100%',
	},
});
