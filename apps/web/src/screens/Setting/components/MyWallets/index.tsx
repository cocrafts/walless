import { Networks } from '@walless/core';
import { Stack, Text } from '@walless/ui';
import { usePublicKeys } from 'utils/hooks';

import Wallet from './Wallet';

const MyWallets = () => {
	const solanaKeys = usePublicKeys(Networks.solana);
	const suiKeys = usePublicKeys(Networks.sui);

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
