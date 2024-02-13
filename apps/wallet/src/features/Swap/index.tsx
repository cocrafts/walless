import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Slider } from '@walless/gui';
import { useTokens } from 'utils/hooks';

import ConfirmPasscode from './ConfirmPasscode';
import { swapActions } from './context';
import InputSwap from './InputSwap';

export type Props = {
	network?: Networks;
};

const SwapFeature: FC<Props> = ({ network }) => {
	const { tokens } = useTokens(network);

	useEffect(() => {
		swapActions.update({ network, fromToken: tokens[0] });
	}, []);

	return (
		<Slider
			style={styles.container}
			slideContainerStyle={styles.slideContainer}
			activeItem={swapScreens[0]}
			items={swapScreens}
		/>
	);
};

export default SwapFeature;

const swapScreens = [
	{
		id: 'Input',
		component: InputSwap,
	},
	{
		id: 'Passcode',
		component: ConfirmPasscode,
	},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		paddingBottom: 28,
		paddingHorizontal: 28,
		gap: 16,
	},
	slideContainer: {
		paddingTop: 16,
		paddingBottom: 28,
		paddingHorizontal: 28,
	},
});
