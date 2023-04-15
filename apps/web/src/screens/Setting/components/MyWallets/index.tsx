import { Stack, Text } from '@walless/gui';
import { wallets } from 'screens/Setting/internal';

import Wallet from './Wallet';

const MyWallets = () => {
	return (
		<Stack gap={12}>
			<Text fontSize={14} color="#566674">
				My Wallets
			</Text>

			<Stack gap={8}>
				{wallets.map((wallet) => (
					<Wallet key={wallet.address} {...wallet} />
				))}
			</Stack>
		</Stack>
	);
};

export default MyWallets;
