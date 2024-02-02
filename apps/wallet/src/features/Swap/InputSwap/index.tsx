import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import FromToken from './FromToken';
import SwitchSeparator from './SwitchSeparator';
import ToToken from './ToToken';

const InputSwap: FC = () => {
	return (
		<View style={styles.swapContainer}>
			<FromToken />
			<SwitchSeparator />
			<ToToken />
		</View>
	);
};

export default InputSwap;

const styles = StyleSheet.create({
	swapContainer: {
		backgroundColor: '#1F2A34',
		borderWidth: 1,
		borderColor: '#566674',
		borderRadius: 15,
		paddingVertical: 20,
		paddingHorizontal: 16,
		gap: 10,
	},
});
