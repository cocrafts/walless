import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WalletNetworkScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text>Wallet Screen</Text>
		</View>
	);
};

export default WalletNetworkScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
