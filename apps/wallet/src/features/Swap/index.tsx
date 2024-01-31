import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { View } from '@walless/gui';
import ModalHeader from 'components/ModalHeader';

import { swapActions } from './context';
import InputSwap from './InputSwap';

export type Props = {
	network?: Networks;
	onPressClose?: () => void;
};

const SwapFeature: FC<Props> = ({ network, onPressClose }) => {
	const handleClose = () => {
		onPressClose?.();
	};

	useEffect(() => {
		swapActions.update({ network });
	}, []);

	return (
		<View style={styles.container}>
			<ModalHeader content="Swap" onPressClose={handleClose} />
			<InputSwap network={network} />
		</View>
	);
};

export default SwapFeature;

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		paddingBottom: 28,
		paddingHorizontal: 28,
		gap: 16,
	},
});
