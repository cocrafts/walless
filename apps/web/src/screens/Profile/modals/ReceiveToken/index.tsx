import { FC } from 'react';
import { ModalConfigs } from '@walless/app';
import { Networks } from '@walless/core';
import { Stack } from '@walless/ui';
import { walletState } from 'state/wallet';
import { getNetworkInfo } from 'utils/helper';
import { useSnapshot } from 'valtio';

import ModalHeader from '../components/ModalHeader';
import ModalWrapper from '../components/ModalWrapper';

import Slider, { IndicatorOption, SlideOption } from './components/Slider';
import WalletCard, { WalletProps } from './components/WalletCard';
import WalletCardIndicator from './components/WalletCardIndicator';

const ReceiveTokenScreen: FC<{ config: ModalConfigs }> = ({ config }) => {
	const keyMaps = useSnapshot(walletState);

	const walletList: WalletProps[] = [];
	Object.values(keyMaps).forEach((keyMap) => {
		keyMap.forEach((key) => {
			const networkInfo = getNetworkInfo(key.network);
			walletList.push({
				network: key.network.charAt(0).toUpperCase() + key.network.slice(1),
				networkIcon: networkInfo?.icon ?? '/img/...',
				address: key._id,
			});
		});
	});

	const moveSelectedItemToTop = (
		items: WalletProps[],
		selectedItem: string,
	) => {
		const filteredItems = items.filter(
			(item) => item.network.toLowerCase() !== selectedItem,
		);
		const selectedItems = items.filter(
			(item) => item.network.toLowerCase() === selectedItem,
		);
		return [...selectedItems, ...filteredItems];
	};

	const style = {
		gap: 20,
	};

	let items: SlideOption[];
	if (config.context) {
		const { network } = config.context as { network: Networks };
		items = moveSelectedItemToTop(walletList, network).map((wallet, index) => ({
			id: `${index}`,
			component: WalletCard,
			context: wallet,
		}));
	} else {
		items = walletList.map((wallet, index) => ({
			id: `${index}`,
			component: WalletCard,
			context: wallet,
		}));
	}

	const indicator: IndicatorOption = {
		id: 'indicator',
		component: WalletCardIndicator,
		context: { cardList: walletList },
	};

	return (
		<ModalWrapper>
			<ModalHeader content="Receive" config={config} />
			<Stack
				flexGrow={1}
				justifyContent="flex-start"
				width={340}
				overflow="hidden"
				paddingVertical={28}
				gap={10}
			>
				<Slider
					style={style}
					items={items}
					distance={-340}
					indicator={indicator}
				/>
			</Stack>
		</ModalWrapper>
	);
};

export default ReceiveTokenScreen;
