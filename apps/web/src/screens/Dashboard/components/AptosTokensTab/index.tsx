import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { TabAble } from '@walless/app';
import { TabsHeader } from '@walless/app';
import { useNfts } from '@walless/app/utils/hooks';
import { Networks } from '@walless/core';
import { aptosState } from '@walless/engine';
import { getAptosConnection } from '@walless/engine/crawlers/aptos';
import type { SlideOption } from '@walless/gui';
import { Slider, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import CollectiblesTab from '../CollectiblesTab';

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
			const conn = await getAptosConnection();
			const fee = await conn.estimateGasPrice();
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
			</View>
		</View>
	);
};

export default AptosTokensTab;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 10,
		paddingTop: 16,
		paddingBottom: 60,
	},
	tabContainer: {
		width: '100%',
	},
	sliderContainer: {
		flex: 1,
		marginTop: 16,
		height: '100%',
	},
});
