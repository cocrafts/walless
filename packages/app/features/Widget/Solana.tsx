import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SolanaWidget: FC = () => {
	return (
		<View style={styles.container}>
			<Text>Solana Widget</Text>
		</View>
	);
};

export default SolanaWidget;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
