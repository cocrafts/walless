import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import {
	type CardSkin,
	MainFeatures,
	SlideHandler,
	TabsHeader,
	TokenList,
	WalletCard,
} from '@walless/app';
import { Networks } from '@walless/core';
import { Stack } from '@walless/ui';
import { showReceiveModal } from 'state/app/modal';
import { usePublicKeys, useTokens } from 'utils/hooks';

import { layoutTabs } from './shared';

interface Props {
	variant?: string;
}

export const SuiDashboard: FC<Props> = () => {
	const tokens = useTokens(Networks.sui);
	const publicKeys = usePublicKeys(Networks.sui);

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
						/>
					);
				})}
			</Stack>
			<Stack alignItems="center" gap={18}>
				<MainFeatures onReceivePress={() => showReceiveModal(Networks.sui)} />
				<SlideHandler items={publicKeys} activeItem={publicKeys[0]} />
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

export default SuiDashboard;

const styles = StyleSheet.create({
	tokenListInner: {
		paddingVertical: 12,
	},
});

const suiCardSkin: CardSkin = {
	backgroundSrc: { uri: '/img/network/sky-card-bg.png' },
	largeIconSrc: { uri: '/img/network/sui-icon-lg.png' },
	iconSrc: { uri: '/img/network/sui-icon-sm.png' },
	iconColor: '#FFFFFF',
	iconSize: 12,
};
