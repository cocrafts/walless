import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Slider } from '@walless/gui';

import type { InjectedElements } from '../../state/transaction';
import { transactionActions } from '../../state/transaction';

import { sendScreens } from './shared';

type Props = Omit<InjectedElements, 'handleClose'> & {
	onClose: () => void;
};

export const SendFeature: FC<Props> = ({
	tokens,
	publicKeys,
	onClose,
	getTransactionFee,
	checkValidAddress,
	createAndSendTransaction,
	getTransactionResult,
}) => {
	transactionActions.injectRequiredElements({
		tokens: tokens,
		publicKeys: publicKeys,
		getTransactionFee,
		handleClose: () => {
			onClose();
			transactionActions.resetTransactionContext();
		},
		checkValidAddress,
		createAndSendTransaction,
		getTransactionResult,
	});

	return (
		<Slider
			style={styles.container}
			slideContainerStyle={styles.slideContainer}
			activeItem={sendScreens[0]}
			items={sendScreens}
			// animator={slideAnimators.bounce}
		></Slider>
	);
};

export default SendFeature;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 576,
		width: 400,
	},
	slideContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 28,
		paddingBottom: 28,
		paddingTop: 16,
	},
});
