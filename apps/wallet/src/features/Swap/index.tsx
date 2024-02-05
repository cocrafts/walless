import { type FC, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Button, View } from '@walless/gui';
import ModalHeader from 'components/ModalHeader';
import { usePublicKeys, useTokens } from 'utils/hooks';

import { swapActions } from './context';
import InputSwap from './InputSwap';

export type Props = {
	network?: Networks;
	onPressClose?: () => void;
};

const SwapFeature: FC<Props> = ({ network, onPressClose }) => {
	const { tokens } = useTokens(network);
	const publicKeys = usePublicKeys(network);
	const [loading, setLoading] = useState(false);

	const handleClose = () => {
		onPressClose?.();
		setTimeout(() => {
			swapActions.resetContext();
		}, 200);
	};

	const handlePressSwap = async () => {
		setLoading(true);
		await swapActions.executeSwap(publicKeys[0]._id);
		setLoading(false);
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

			{loading ? (
				<ActivityIndicator />
			) : (
				<Button title="Swap" onPress={handlePressSwap} />
			)}
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
