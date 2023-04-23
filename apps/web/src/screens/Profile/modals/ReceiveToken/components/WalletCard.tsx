import { FC } from 'react';
import { Stack } from '@walless/ui';

import QRCodeSVG from '../components/QRCode';
import WalletAddress from '../components/WalletAddress';

export interface WalletProps {
	network: string;
	networkIcon: string;
	address: string;
}

const WalletCard: FC<WalletProps> = ({ network, networkIcon, address }) => {
	return (
		<Stack
			justifyContent="space-between"
			alignItems="center"
			width={348}
			height={348}
			backgroundColor="#242F38"
			borderRadius={16}
			paddingTop={44}
			paddingBottom={20}
		>
			<QRCodeSVG value={address} />
			<WalletAddress
				network={network}
				networkIcon={networkIcon}
				address={address}
			/>
		</Stack>
	);
};

export default WalletCard;
