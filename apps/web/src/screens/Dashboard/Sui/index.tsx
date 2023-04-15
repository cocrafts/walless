import { type FC } from 'react';
import { type CardSkin, WalletCard } from '@walless/app';
import { Networks } from '@walless/core';
import { Stack, Text } from '@walless/gui';
import { TokenRecord } from '@walless/storage';
import { walletState } from 'state/wallet';
import { useSnapshot } from 'utils/hooks';

interface Props {
	variant?: string;
}

export const SuiDashboard: FC<Props> = () => {
	const { keys } = useSnapshot(walletState);
	const suiKey = keys.find((key) => key.network === Networks.sui);
	const address = suiKey?.id as string;
	const token: TokenRecord = {
		id: address,
		network: Networks.sui,
		account: { balance: 0 },
	};

	return (
		<Stack flex={1} padding={12}>
			<WalletCard index={0} skin={suiCardSkin} token={token} />
			<Text>SuiDashboard</Text>
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
