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
import { Copy } from '@walless/icons';
import { Stack } from '@walless/ui';
import { layoutTabs } from 'screens/Dashboard/shared';
import { appActions } from 'state/app';
import { showReceiveModal } from 'state/app/modal';
import { usePublicKeys, useTokens } from 'utils/hooks';

interface Props {
	variant?: string;
}

export const SolanaDashboard: FC<Props> = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const tokens = useTokens(Networks.solana);
	const publicKeys = usePublicKeys(Networks.solana);
	const onTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	const handleCopyAddress = async (value: string) => {
		await appActions.copy(value, () => <Copy size={18} color="#FFFFFF" />);
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
							skin={suiCardSkin}
							onCopyAddress={handleCopyAddress}
						/>
					);
				})}
			</Stack>
			<Stack alignItems="center" gap={18}>
				<MainFeatures
					onReceivePress={() => showReceiveModal(Networks.solana)}
				/>
				{publicKeys.length > 1 && (
					<SlideHandler items={publicKeys} activeItem={publicKeys[0]} />
				)}
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
