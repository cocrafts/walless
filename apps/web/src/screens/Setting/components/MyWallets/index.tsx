import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
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
		<View style={styles.container}>
			<Text style={styles.walletText}>My Wallets</Text>

			<View style={styles.walletContainer}>
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
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
	walletText: {
		fontSize: 14,
		color: '#566674',
	},
	walletContainer: {
		gap: 8,
	},
});

export default MyWallets;