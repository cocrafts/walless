import { type FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
	type CardSkin,
	MainFeatures,
	SlideHandler,
	TabAble,
	TabsHeader,
	WalletCard,
} from '@walless/app';
import { Networks } from '@walless/core';
import { Slider } from '@walless/gui';
import { TokenRecord } from '@walless/storage';
import { Stack } from '@walless/ui';
import { showReceiveModal } from 'state/app/modal';
import { tokenListActions } from 'state/tokenList';
import { usePublicKeys, useTokens } from 'utils/hooks';

import { bottomItems, layoutTabs } from './shared';

interface Props {
	variant?: string;
}

export const SuiDashboard: FC<Props> = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const tokens = useTokens(Networks.sui);
	const keys = usePublicKeys(Networks.sui);
	const address = keys[0]?._id as string;
	const token: TokenRecord = {
		id: address,
		network: Networks.sui,
		metadata: { symbol: 'SOL' },
		account: { balance: '0', decimals: 9 },
	};
	const cards = token?.id ? [token] : [];

	const onTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	useEffect(() => {
		tokenListActions.set(tokens);
	}, [tokens]);

	return (
		<Stack flex={1} gap={18}>
			<Stack horizontal gap={12} paddingHorizontal={12}>
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
			<Stack alignItems="center" gap={18} paddingHorizontal={12}>
				<MainFeatures onReceivePress={() => showReceiveModal(Networks.sui)} />
				<SlideHandler items={cards} activeItem={cards[0]} />
			</Stack>
			<Stack height={588} paddingBottom={12}>
				<Stack paddingHorizontal={12}>
					<TabsHeader
						items={layoutTabs}
						activeItem={layoutTabs[activeTabIndex]}
						onTabPress={onTabPress}
					/>
				</Stack>
				<Slider
					items={bottomItems}
					activeItem={bottomItems[activeTabIndex]}
					style={styles.slider}
					slideContainerStyle={styles.slideContainer}
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

const styles = StyleSheet.create({
	slider: {
		flex: 1,
	},
	slideContainer: {
		paddingHorizontal: 12,
		paddingTop: 12,
	},
});
