import { Networks } from '@walless/core';
import { Stack, Text } from '@walless/ui';
import { usePublicKeys } from 'utils/hooks';

import Wallet from './Wallet';

export const MyWallets = () => {
	const solanaKeys = usePublicKeys(Networks.solana);
	const suiKeys = usePublicKeys(Networks.sui);
	const tezosKeys = usePublicKeys(Networks.tezos);
	const suiIndex = solanaKeys.length;
	const tezosIndex = suiIndex + suiKeys.length;
	const aptosKeys = usePublicKeys(Networks.aptos);
	const aptosIndex = tezosIndex + tezosKeys.length;

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
					<Wallet key={item._id} index={index + suiIndex} item={item} />
				))}
				{tezosKeys.map((item, index) => (
					<Wallet key={item._id} index={index + tezosIndex} item={item} />
				))}
				{aptosKeys.map((item, index) => (
					<Wallet key={item._id} index={index + aptosIndex} item={item} />
				))}
			</Stack>
		</Stack>
	);
};

export default MyWallets;
