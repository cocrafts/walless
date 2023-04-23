import { Stack, Text } from '@walless/ui';
import { walletState } from 'state/wallet';
import { useSnapshot } from 'utils/hooks';

import Wallet from './Wallet';

const MyWallets = () => {
	const { suiKeyMap, solanaKeyMap } = useSnapshot(walletState);
	const suiKeys = Array.from(suiKeyMap.values());
	const solanaKeys = Array.from(solanaKeyMap.values());

	return (
		<Stack gap={12}>
			<Text fontSize={14} color="#566674">
				My Wallets
			</Text>

			<Stack gap={8}>
				{solanaKeys.map((item, index) => (
					<Wallet key={item._id} index={index} item={item} />
				))}
				{suiKeys.map((item, index) => (
					<Wallet key={item._id} index={index} item={item} />
				))}
			</Stack>
		</Stack>
	);
};

export default MyWallets;
