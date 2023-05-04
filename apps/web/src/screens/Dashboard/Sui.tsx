import { type FC, useState } from 'react';
import {
	type CardSkin,
	MainFeatures,
	SlideHandler,
	TabAble,
	TabsHeader,
	TokenList,
	WalletCard,
} from '@walless/app';
import { Networks } from '@walless/core';
import { Copy } from '@walless/icons';
import { TokenRecord } from '@walless/storage';
import { Stack } from '@walless/ui';
import { appActions } from 'state/app';
import { showReceiveModal } from 'state/app/modal';
import { usePublicKeys, useTokens } from 'utils/hooks';

import EmptyTab from './EmptyTab';
import { layoutTabs } from './shared';

interface Props {
	variant?: string;
}

export const SuiDashboard: FC<Props> = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const tokens = useTokens(Networks.sui);
	const publicKeys = usePublicKeys(Networks.sui);
	const address = publicKeys[0]?._id as string;
	const token: TokenRecord = {
		id: address,
		network: Networks.sui,
		metadata: { symbol: 'SUI' },
		account: { balance: '0', decimals: 9 },
	};
	const cards = token?.id ? [token] : [];
	const onTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	const handleCopyAddress = async (value: string) => {
		await appActions.copy(value, () => <Copy size={18} color="#FFFFFF" />);
	};

	const handleSend = () => {
		appActions.showSendModal(Networks.sui);
	};

	return (
		<Stack flex={1} padding={12} gap={18}>
			<Stack horizontal gap={12}>
				{cards.map((token, index) => {
					return (
						<WalletCard
							key={index}
							index={index}
							skin={suiCardSkin}
							token={token}
							onCopyAddress={handleCopyAddress}
						/>
					);
				})}
			</Stack>
			<Stack alignItems="center" gap={18}>
				<MainFeatures
					onSendPress={handleSend}
					onReceivePress={() => showReceiveModal(Networks.sui)}
				/>
				<SlideHandler items={cards} activeItem={cards[0]} />
			</Stack>
			<Stack>
				<TabsHeader
					items={layoutTabs}
					activeItem={layoutTabs[activeTabIndex]}
					onTabPress={onTabPress}
				/>
				{tokens ? <TokenList items={tokens} /> : <EmptyTab />}
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
