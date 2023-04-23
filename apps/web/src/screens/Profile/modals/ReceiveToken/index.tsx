import { FC, useEffect, useState } from 'react';
import { ModalConfigs } from '@walless/app';
import { Button, Stack } from '@walless/ui';
import { walletState } from 'state/wallet';
import { getNetworkInfo } from 'utils/helper';
import { useSnapshot } from 'valtio';

import ModalHeader from '../components/ModalHeader';
import ModalWrapper from '../components/ModalWrapper';

import WalletCard from './components/WalletCard';
import { WalletProps } from './components/WalletCard';

const ReceiveTokenScreen: FC<{ config: ModalConfigs }> = ({ config }) => {
	const [current, setCurrent] = useState(0);

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

	const [currentWallet, setCurrentWallet] = useState<WalletProps>(
		walletList[0],
	);

	useEffect(() => {
		const next = (current + 1) % walletList.length;
		const id = setTimeout(() => setCurrent(next), 500);
		return () => clearTimeout(id);
	}, [current]);

	return (
		<ModalWrapper>
			<ModalHeader content="Receive" config={config} />
			<Stack
				flexGrow={1}
				justifyContent="flex-start"
				alignItems="center"
				width={340}
				paddingVertical={30}
				gap={30}
			>
				<WalletCard
					network={currentWallet.network}
					networkIcon={currentWallet.networkIcon}
					address={currentWallet.address}
				/>

				<Stack gap={8} flexDirection="row">
					{walletList.map((wallet, index) => (
						<Button
							key={index}
							backgroundColor={
								wallet.address === currentWallet.address ? '#0694D3' : '#202D38'
							}
							width={40}
							height={4}
							borderRadius={8}
							padding={0}
							title=""
							onPress={() => {
								setCurrentWallet(wallet);
							}}
						/>
					))}
				</Stack>
				{/* {walletList.map((wallet, index) => (
					<WalletCard
						key={index}
						network={wallet.network}
						networkIcon={wallet.networkIcon}
						address={wallet.address}
					/>
				))} */}
			</Stack>
		</ModalWrapper>
	);
};

export default ReceiveTokenScreen;
