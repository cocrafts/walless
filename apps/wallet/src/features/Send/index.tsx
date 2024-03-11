import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Slider } from '@walless/gui';
import type { NftDocumentV2 } from '@walless/store';

import ConfirmByPasscode from './ConfirmByPasscode';
import ConfirmTransaction from './ConfirmTransaction';
import InputTransaction from './InputTransaction';
import type { NftTransactionContext } from './internal';
import { txActions } from './internal';
import TransactionResult from './TransactionResult';

export type Props = {
	network?: Networks;
	nft?: NftDocumentV2;
};

export const SendFeature: FC<Props> = ({ network, nft }) => {
	useEffect(() => {
		if (network) txActions.update({ network });
		if (nft) txActions.update<NftTransactionContext>({ nft, type: 'nft' });
	}, []);

	return (
		<Slider
			style={styles.container}
			slideContainerStyle={styles.slideContainer}
			activeItem={sendScreens[0]}
			items={sendScreens}
			lazy={true}
		/>
	);
};

export default SendFeature;

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

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	slideContainer: {
		paddingTop: 16,
		paddingBottom: 28,
		paddingHorizontal: 28,
	},
});
