import type { FC } from 'react';
import { Stack } from '@walless/ui';

import QRCodeSVG from '../components/QRCode';
import WalletAddress from '../components/WalletAddress';

import type { SlideOption } from './Slider';

interface Props {
	config: SlideOption;
}

export interface WalletProps {
	network: string;
	networkIcon: string;
	address: string;
}

const WalletCard: FC<Props> = ({ config }) => {
	const { network, networkIcon, address } = config.context as WalletProps;

	return (
		<Stack
			justifyContent="space-between"
			alignItems="center"
			width={340}
			height={340}
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
