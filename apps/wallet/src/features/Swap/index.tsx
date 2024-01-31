import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Button, View } from '@walless/gui';
import ModalHeader from 'components/ModalHeader';
import { useTokens } from 'utils/hooks';

import { swapActions } from './context';
import InputSwap from './InputSwap';

export type Props = {
	network?: Networks;
	onPressClose?: () => void;
};

const SwapFeature: FC<Props> = ({ network, onPressClose }) => {
	const { tokens } = useTokens(network);

	const handleClose = () => {
		onPressClose?.();
	};

	useEffect(() => {
		swapActions.update({ network, fromToken: tokens[0] });
	}, []);

	return (
		<View style={styles.container}>
			<ModalHeader content="Swap" onPressClose={handleClose} />

			<View style={styles.mainContainer}>
				<InputSwap />
			</View>

			<Button title="Swap" />
		</View>
	);
};

export default SwapFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		paddingBottom: 28,
		paddingHorizontal: 28,
		gap: 16,
	},
	mainContainer: {
		flex: 1,
	},
});
