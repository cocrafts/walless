import { type FC, useState } from 'react';
import { StyleSheet } from 'react-native';
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
import { TokenRecord } from '@walless/storage';
import { Stack } from '@walless/ui';
import { layoutTabs } from 'screens/Dashboard/shared';
import { usePublicKeys, useTokens } from 'utils/hooks';

interface Props {
	variant?: string;
}

export const SolanaDashboard: FC<Props> = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const tokens = useTokens(Networks.solana);
	const publicKeys = usePublicKeys(Networks.solana);

	const address = publicKeys[0]?._id as string;
	const token: TokenRecord = {
		id: address,
		network: Networks.solana,
		metadata: { symbol: 'SOL' },
		account: { balance: '0', decimals: 9 },
	};
	const cards = token?.id ? [token] : [];
	const onTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
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
						/>
					);
				})}
			</Stack>
			<Stack alignItems="center" gap={18}>
				<MainFeatures />
				<SlideHandler items={cards} activeItem={cards[0]} />
			</Stack>
			<Stack>
				<TabsHeader
					items={layoutTabs}
					activeItem={layoutTabs[activeTabIndex]}
					onTabPress={onTabPress}
				/>
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
