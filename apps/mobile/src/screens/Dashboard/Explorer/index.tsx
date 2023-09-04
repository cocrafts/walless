import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ExplorerScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text>Explorer</Text>
		</View>
	);
};

export default ExplorerScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
