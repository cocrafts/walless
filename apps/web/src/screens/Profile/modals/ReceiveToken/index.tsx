import { FC } from 'react';
import { ModalConfigs } from '@walless/app';
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

	const style = {
		gap: 20,
	};
	const items: SlideOption[] = walletList.map((wallet) => ({
		id: wallet.address,
		component: WalletCard,
		context: wallet,
	}));

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
				gap={30}
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
