import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SolanaApp: FC = () => {
	return (
		<View style={styles.container}>
			<Text>Solana App</Text>
		</View>
	);
};

export default SolanaApp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
