import { Stack, Text } from '@walless/ui';
import { walletState } from 'state/wallet';
import { useSnapshot } from 'utils/hooks';

import Wallet from './Wallet';

const MyWallets = () => {
	const { keys } = useSnapshot(walletState);

	return (
		<Stack gap={12}>
			<Text fontSize={14} color="#566674">
				My Wallets
			</Text>

			<Stack gap={8}>
				{keys.map((wallet, index) => (
					<Wallet key={wallet.id} index={index} item={wallet} />
				))}
			</Stack>
		</Stack>
	);
};

export default MyWallets;
