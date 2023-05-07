import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Networks, Token } from '@walless/core';
import { slideAnimators, Slider } from '@walless/gui';

import { transactionActions } from '../../state/transaction';

import { sendScreens } from './shared';

interface Props {
	tokenList: Token[];
	onClose: () => void;
	onPressSendButton: () => void;
	getTransactionFee: (network: Networks) => Promise<number>;
}

export const SendTokenScreen: FC<Props> = ({
	tokenList,
	getTransactionFee,
}) => {
	console.log({ tokenList, getTransactionFee });

	transactionActions.injectRequiredElements({
		tokens: tokenList,
		getTransactionFee: getTransactionFee,
	});

	return (
		<Slider
			style={styles.container}
			slideContainerStyle={styles.slideContainer}
			activeItem={sendScreens[0]}
			items={sendScreens}
			animator={slideAnimators.bounce}
		></Slider>
	);
};

export default SendTokenScreen;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: 576,
		width: 400,
	},
	slideContainer: {
		flex: 1,
		paddingHorizontal: 28,
		paddingVertical: 28,
	},
});
