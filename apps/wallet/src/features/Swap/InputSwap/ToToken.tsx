import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'utils/hooks';

import { swapActions, swapContext } from '../context';

import SelectButton from './SelectButton';

const ToToken = () => {
	const { toToken } = useSnapshot(swapContext).swap;

	const handleSelectToToken = () => {
		swapActions.openSelectToken('to');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>To</Text>
			<View style={styles.tokenContainer}>
				<SelectButton
					symbol={toToken?.symbol}
					logoURI={toToken?.logoURI}
					onPress={handleSelectToToken}
				/>
			</View>
		</View>
	);
};

export default ToToken;

const styles = StyleSheet.create({
	container: {
		gap: 14,
		paddingBottom: 30,
	},
	title: {
		color: '#FFFFFF',
	},
	tokenContainer: {
		flexDirection: 'row',
	},
});
