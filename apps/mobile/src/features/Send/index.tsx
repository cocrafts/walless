import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Slider } from '@walless/gui';

import ConfirmByPasscode from './ConfirmByPasscode';
import ConfirmTransaction from './ConfirmTransaction';
import { txActions } from './context';
import InputTransaction from './InputTransaction';
import TransactionResult from './TransactionResult';

export type Props = {
	network?: Networks;
};

export const SendFeature: FC<Props> = ({ network }) => {
	const sendScreens = [
		{
			id: 'Input',
			component: InputTransaction,
		},
		{
			id: 'Confirm',
			component: ConfirmTransaction,
		},
		{
			id: 'Passcode',
			component: ConfirmByPasscode,
		},
		{
			id: 'Result',
			component: TransactionResult,
		},
	];

	useEffect(() => {
		if (network) txActions.setNetwork(network);
	}, []);

	return (
		<Slider
			style={styles.container}
			slideContainerStyle={styles.slideContainer}
			activeItem={sendScreens[0]}
			items={sendScreens}
		></Slider>
	);
};

export default SendFeature;

const styles = StyleSheet.create({
	container: {
		height: 590,
	},
	slideContainer: {
		height: 590,
		paddingTop: 16,
		paddingBottom: 28,
		paddingHorizontal: 28,
	},
});
