import { StyleSheet } from 'react-native';
import { Hoverable, View } from '@walless/gui';
import { Switch } from '@walless/icons';
import { showError } from 'modals/Error';

import { swapContext } from '../context';

const SwitchSeparator = () => {
	const handleSwitch = () => {
		if (!swapContext.swap.fromToken || !swapContext.swap.toToken) {
			showError({ errorText: 'Please select tokens to swap' });
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.separateLine} />
			<Hoverable style={styles.switchButton} onPress={handleSwitch}>
				<Switch size={20} color="#3DC3FF" />
			</Hoverable>
			<View style={styles.separateLine} />
		</View>
	);
};

export default SwitchSeparator;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginVertical: 6,
	},
	separateLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#566674',
	},
	switchButton: {
		borderWidth: 1,
		borderColor: '#566674',
		borderRadius: 100,
		padding: 8,
	},
});
