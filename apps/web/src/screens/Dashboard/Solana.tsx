import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { CardSkin, TabAble } from '@walless/app';
import {
	MainFeatureButtons,
	SlideHandler,
	TabsHeader,
	WalletCard,
} from '@walless/app';
import { copy, showSendModal } from '@walless/app/utils';
import { showReceiveModal } from '@walless/app/utils';
import { Networks } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider } from '@walless/gui';
import { Copy } from '@walless/icons';
import { modules } from '@walless/ioc';
import { Stack } from '@walless/ui';
import { layoutTabs } from 'screens/Dashboard/shared';
import { onrampWithGateFi } from 'utils/gatefi';
import { useNfts, usePublicKeys, useSettings, useTokens } from 'utils/hooks';

import ActivityTab from './components/ActivityTab';
import { CollectiblesTab, TokenTab } from './components';

interface Props {
	variant?: string;
}

export const SolanaDashboard: FC<Props> = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const { setting, setPrivacy } = useSettings();
	const publicKeys = usePublicKeys(Networks.solana);
	const { tokens, valuation } = useTokens(Networks.solana);
	const { collections } = useNfts(Networks.solana);

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
			component: () => <ActivityTab network={Networks.solana} />,
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
		showSendModal({ layoutNetwork: Networks.solana });
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
							skin={makeCardSkin()}
							hideBalance={setting.hideBalance}
							onCopyAddress={handleCopyAddress}
							onChangePrivateSetting={handleChangePrivateSetting}
							width={publicKeys.length == 1 ? 328 : 312}
						/>
					);
				})}
			</Stack>

			<Stack alignItems="center" gap={18}>
				<MainFeatureButtons
					onReceivePress={() => showReceiveModal(Networks.solana)}
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

export default SolanaDashboard;

const makeCardSkin = (): CardSkin => {
	return {
		backgroundSrc: modules.asset.widget.solana.cardBackground,
		iconSrc: modules.asset.widget.solana.cardIcon,
		largeIconSrc: modules.asset.widget.solana.cardMark,
		iconColor: '#000000',
		iconSize: 16,
	};
};

const styles = StyleSheet.create({
	sliderContainer: {
		flex: 1,
		height: '100%',
	},
});
