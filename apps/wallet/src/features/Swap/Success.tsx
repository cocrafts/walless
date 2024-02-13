import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { Switch } from '@walless/icons';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';

import { swapContext } from './context';

const Success = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		...styles.container,
		paddingTop: Math.max(insets.top, 20),
		paddingBottom: 20,
	};

	const { fromToken, amount, toToken, swapQuote } =
		useSnapshot(swapContext).swap;

	const fromSymbol = fromToken?.metadata?.symbol;
	const toSymbol = toToken?.symbol;
	const outAmount = swapQuote
		? (parseInt(swapQuote.outAmount) * 1.0) / 10 ** (toToken?.decimals || 0)
		: 0;

	return (
		<View style={containerStyle}>
			<Switch size={14} />
			<Text style={styles.content}>
				Swapped {amount} {fromSymbol} for {outAmount} {toSymbol}
			</Text>
		</View>
	);
};

export default Success;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#43B274',
		gap: 10,
	},
	content: {
		color: '#FFFFFF',
	},
});
