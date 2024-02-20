import type { FC } from 'react';
import type { PublicKeyDocument } from '@walless/store';
import BaseWallet from 'components/Wallet';
import { getNetworkInfo, type NetworkInfo } from 'utils/helper';

interface Props {
	item: PublicKeyDocument;
	index: number;
}

export const Wallet: FC<Props> = ({ item, index }) => {
	const network = getNetworkInfo(item.network) as NetworkInfo;

	return (
		<BaseWallet
			name={`Wallet ${index + 1} (${network?.name})`}
			address={item._id}
			icon={network.icon}
		/>
	);
};

export default Wallet;
