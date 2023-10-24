import { type FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { TabAble } from '@walless/app';
import { TabsHeader } from '@walless/app';
import { aptosState } from '@walless/engine';
import { getAptosConnection } from '@walless/engine/crawlers/aptos';
import type { SlideOption } from '@walless/gui';
import { Slider, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import DirectTransfer from './DirectTransfer';
import OwnedTokens from './OwnedTokens';
import PendingTokens from './PendingTokens';

interface Props {
	pubkey: string;
}

const AptosTokensTab: FC<Props> = ({ pubkey }) => {
	const aptosSnap = useSnapshot(aptosState);
	const [fee, setFee] = useState(0);

	useEffect(() => {
		const getFee = async () => {
			const conn = await getAptosConnection();
			const fee = await conn.estimateGasPrice();
			return fee.gas_estimate / 10 ** 8;
		};
		getFee().then(setFee).catch(console.error);
	}, [aptosSnap]);

	const ownedTokens = Array.from(aptosSnap.ownedTokens.values());
	const pendingTokens = Array.from(aptosSnap.pendingTokens.values());
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const layoutTabs: TabAble[] = [
		{
			id: 'owned',
			title: `Owned Tokens (${ownedTokens.length})`,
		},
		{
			id: 'pending',
			title: `Pending Tokens (${pendingTokens.length})`,
		},
	];

	const bottomSliderItems: SlideOption[] = [
		{
			id: 'owned',
			component: () => <OwnedTokens />,
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