import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import {
	type CardSkin,
	MainFeatures,
	SlideHandler,
	TabsHeader,
	WalletCard,
} from '@walless/app';
import { TokenList } from '@walless/app';
import { Networks } from '@walless/core';
import { TokenRecord } from '@walless/storage';
import { Stack } from '@walless/ui';
import { layoutTabs } from 'screens/Dashboard/shared';
import { tokenState } from 'state/tokens';
import { walletState } from 'state/wallet';
import { useSnapshot } from 'utils/hooks';

interface Props {
	variant?: string;
}

export const SolanaDashboard: FC<Props> = () => {
	const { solanaKeyMap } = useSnapshot(walletState);
	const { solanaTokenMap } = useSnapshot(tokenState);
	const allKeys = Array.from(solanaKeyMap.values());
	const tokens = Array.from(solanaTokenMap.values());
	const address = allKeys[0]?._id as string;
	const token: TokenRecord = {
		id: address,
		network: Networks.solana,
		metadata: { symbol: 'SOL' },
		account: { balance: 0 },
	};
	const cards = token?.id ? [token] : [];

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
						/>
					);
				})}
			</Stack>
			<Stack alignItems="center" gap={18}>
				<MainFeatures />
				<SlideHandler items={cards} activeItem={cards[0]} />
			</Stack>
			<Stack>
				<TabsHeader items={layoutTabs} activeItem={layoutTabs[0]} />
				<TokenList
					contentContainerStyle={styles.tokenListInner}
					items={tokens}
				/>
			</Stack>
		</Stack>
	);
};

export default SolanaDashboard;

const suiCardSkin: CardSkin = {
	backgroundSrc: { uri: '/img/network/sky-card-bg.png' },
	largeIconSrc: { uri: '/img/network/solana-icon-lg.png' },
	iconSrc: { uri: '/img/network/solana-icon-sm.png' },
	iconColor: '#000000',
	iconSize: 16,
};

const styles = StyleSheet.create({
	tokenListInner: {
		paddingVertical: 12,
	},
});
