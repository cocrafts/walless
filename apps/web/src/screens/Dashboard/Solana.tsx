import { type FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
	type AccountChangeCallback,
	clusterApiUrl,
	Connection,
	PublicKey,
} from '@solana/web3.js';
import {
	MainFeatures,
	SlideHandler,
	TabsHeader,
	WalletCard,
} from '@walless/app';
import { Networks } from '@walless/core';
import { tokenActions } from '@walless/engine';
import { solMint } from '@walless/engine/solana/shared';
import { type SlideOption, Slider } from '@walless/gui';
import { Copy } from '@walless/icons';
import { Stack } from '@walless/ui';
import { layoutTabs } from 'screens/Dashboard/shared';
import { appActions } from 'state/app';
import { showReceiveModal } from 'state/app/modal';
import { useNfts, usePublicKeys, useSettings, useTokens } from 'utils/hooks';

import { CollectiblesTab, EmptyTab, TokenTab } from './components';

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
			component: EmptyTab,
		},
	];

	const handleAccountChange: AccountChangeCallback = (info) => {
		let balance;
		let mint;
		let owner;

		if (info.data.byteLength === 0) {
			balance = info.lamports.toString();
			mint = solMint;
			owner = publicKeys[0]._id;
		} else {
			const data = AccountLayout.decode(info.data);
			owner = data.owner.toString();
			mint = data.mint.toString();
			balance = data.amount.toString();
		}
		tokenActions.updateBalance(owner, mint, balance);
	};

	useEffect(() => {
		const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

		const subscriptionList: number[] = [];

		subscriptionList.push(
			connection.onAccountChange(
				new PublicKey(publicKeys[0]._id),
				handleAccountChange,
			),
		);

		connection
			.getTokenAccountsByOwner(new PublicKey(publicKeys[0]._id), {
				programId: TOKEN_PROGRAM_ID,
			})
			.then((res) => {
				res.value.map((ata) =>
					subscriptionList.push(
						connection.onAccountChange(ata.pubkey, handleAccountChange),
					),
				);
			});

		return () => {
			subscriptionList.forEach((subscription) => {
				connection.removeAccountChangeListener(subscription);
			});
		};
	}, []);

	const handleTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	const handleCopyAddress = async (value: string) => {
		await appActions.copy(value, () => <Copy size={18} color="#FFFFFF" />);
	};

	const handleSend = () => {
		appActions.showSendModal({ layoutNetwork: Networks.solana });
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
							skin={suiCardSkin}
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
					onReceivePress={() => showReceiveModal(Networks.solana)}
					onSendPress={handleSend}
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

const suiCardSkin: CardSkin = {
	backgroundSrc: { uri: '/img/network/sky-card-bg.png' },
	largeIconSrc: { uri: '/img/network/solana-icon-lg.png' },
	iconSrc: { uri: '/img/network/solana-icon-sm.png' },
	iconColor: '#000000',
	iconSize: 16,
};

const styles = StyleSheet.create({
	sliderContainer: {
		flex: 1,
		height: '100%',
	},
});
