import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import type { SlideOption } from '@walless/gui';
import { Slider, View } from '@walless/gui';
import { engine } from 'engine';
import type { AptosContext } from 'engine/runners';
import { aptosState } from 'state/assets';
import { useNfts } from 'utils/hooks';
import { useSnapshot } from 'valtio';

import CollectiblesTab from '../CollectiblesTab';
import type { TabAble } from '../SliderTabs';
import SliderTabs from '../SliderTabs';

import DirectTransfer from './DirectTransfer';
import PendingTokens from './PendingTokens';

interface Props {
	pubkey: string;
}

const APTOS_COIN_DECIMALS = 8;

const AptosTokensTab: FC<Props> = ({ pubkey }) => {
	const aptosSnap = useSnapshot(aptosState);
	const [fee, setFee] = useState(0);

	useEffect(() => {
		const getFee = async () => {
			const { provider } = engine.getContext<AptosContext>(Networks.aptos);
			const fee = await provider.estimateGasPrice();
			setFee(fee.gas_estimate / 10 ** APTOS_COIN_DECIMALS);
		};
		getFee();
	}, [aptosSnap]);

	const pendingTokens = Array.from(aptosSnap.pendingTokens.values());
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const { collections } = useNfts(Networks.aptos);

	const countCollectibles = useMemo(
		() => collections.reduce((acc, ele) => acc + ele.count, 0),
		[collections],
	);

	const layoutTabs: TabAble[] = [
		{
			id: 'owned',
			title: `Owned Tokens (${countCollectibles})`,
		},
		{
			id: 'pending',
			title: `Pending Tokens (${pendingTokens.length})`,
		},
	];

	const bottomSliderItems: SlideOption[] = [
		{
			id: 'owned',
			component: () => <CollectiblesTab collections={collections} />,
		},
		{
			id: 'pending',
			component: () => <PendingTokens fee={fee} />,
		},
	];

	const handleTabPress = (item: TabAble) => {
		const idx = layoutTabs.indexOf(item);
		setActiveTabIndex(idx);
	};

	return (
		<View style={styles.container}>
			<DirectTransfer
				pubkey={pubkey}
				directTransfer={aptosSnap.directTransfer}
				fee={fee}
			/>

			<View style={styles.tabContainer}>
				<SliderTabs
					items={layoutTabs}
					activeItem={layoutTabs[activeTabIndex]}
					onTabPress={handleTabPress}
				/>

				<Slider
					style={styles.sliderContainer}
					items={bottomSliderItems}
					activeItem={bottomSliderItems[activeTabIndex]}
				/>
			</View>
		</View>
	);
};

export default AptosTokensTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 16,
		gap: 16,
	},
	tabContainer: {
		flex: 1,
	},
	sliderContainer: {
		flex: 1,
		marginTop: 16,
		padding: 16,
	},
});
