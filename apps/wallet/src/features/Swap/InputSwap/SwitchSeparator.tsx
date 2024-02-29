import { StyleSheet } from 'react-native';
import { Hoverable, View } from '@walless/gui';
import { Switch } from '@walless/icons';
import { showError } from 'modals/Error';
import { useJupiterContext, useSnapshot, useTokens } from 'utils/hooks';

import { swapActions, swapContext } from '../context';

const SwitchSeparator = () => {
	const { network } = useSnapshot(swapContext).swap;
	const { tokens } = useTokens(network);
	const { tokens: JupTokens } = useJupiterContext();

	const handleSwitch = () => {
		if (!swapContext.swap.fromToken || !swapContext.swap.toToken) {
			showError({ errorText: 'Please select tokens to swap' });
		}
		const newFromToken = tokens.find(
			(t) => t.account.mint === swapContext.swap.toToken?.address,
		);
		const newToToken = JupTokens.find(
			(t) => t.address === swapContext.swap.fromToken?.account.mint,
		);
		if (!newFromToken || !newFromToken) return;

		swapActions.update({ fromToken: newFromToken, toToken: newToToken });
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
