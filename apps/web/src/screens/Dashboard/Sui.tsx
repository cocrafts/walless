import { type FC, useEffect, useState } from 'react';
import {
	type CardSkin,
	type TabAble,
	MainFeatures,
	SlideHandler,
	TabsHeader,
	WalletCard,
} from '@walless/app';
import { Networks } from '@walless/core';
import { Slider } from '@walless/gui';
import { Copy } from '@walless/icons';
import { Stack } from '@walless/ui';
import { appActions } from 'state/app';
import { showReceiveModal } from 'state/app/modal';
import { tokenListActions } from 'state/tokens';
import { usePublicKeys, useTokens } from 'utils/hooks';

import { bottomSliderItems, layoutTabs } from './shared';

interface Props {
	variant?: string;
}

export const SuiDashboard: FC<Props> = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const tokens = useTokens(Networks.sui);
	const publicKeys = usePublicKeys(Networks.sui);
	const handleTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	const handleCopyAddress = async (value: string) => {
		await appActions.copy(value, () => <Copy size={18} color="#FFFFFF" />);
	};

	const handleSend = () => {
		appActions.showSendModal(Networks.sui);
	};

	useEffect(() => {
		tokenListActions.set(tokens);
	}, [tokens]);

	return (
		<Stack flex={1} padding={12} gap={18}>
			<Stack horizontal gap={12}>
				{publicKeys.map((item, index) => {
					return (
						<WalletCard
							key={index}
							index={index}
							item={item}
							skin={suiCardSkin}
							onCopyAddress={handleCopyAddress}
							width={publicKeys.length == 1 ? 328 : 312}
						/>
					);
				})}
			</Stack>
			<Stack alignItems="center" gap={18}>
				<MainFeatures
					onReceivePress={() => showReceiveModal(Networks.sui)}
					onSendPress={handleSend}
				/>
				{publicKeys.length > 1 && (
					<SlideHandler items={publicKeys} activeItem={publicKeys[0]} />
				)}
			</Stack>
			<Stack>
				<TabsHeader
					items={layoutTabs}
					activeItem={layoutTabs[activeTabIndex]}
					onTabPress={handleTabPress}
				/>
				<Slider
					items={bottomSliderItems}
					activeItem={bottomSliderItems[activeTabIndex]}
				/>
			</Stack>
		</Stack>
	);
};

export default SuiDashboard;

const suiCardSkin: CardSkin = {
	backgroundSrc: { uri: '/img/network/sky-card-bg.png' },
	largeIconSrc: { uri: '/img/network/sui-icon-lg.png' },
	iconSrc: { uri: '/img/network/sui-icon-sm.png' },
	iconColor: '#FFFFFF',
	iconSize: 12,
};
