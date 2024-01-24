import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Slider } from '@walless/gui';
import type { CollectibleDocument } from '@walless/store';
import { useNfts } from 'utils/hooks';

import ConfirmByPasscode from './ConfirmByPasscode';
import ConfirmTransaction from './ConfirmTransaction';
import { txActions } from './context';
import InputTransaction from './InputTransaction';
import TransactionResult from './TransactionResult';

export type Props = {
	network?: Networks;
	collectible?: CollectibleDocument;
};

export const SendFeature: FC<Props> = ({ network, collectible }) => {
	const { collections } = useNfts();

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
		if (network) txActions.update({ network });
		if (collectible) {
			const collection = collections.find(
				(ele) => ele._id === collectible.collectionId,
			);
			txActions.update({ collectible, collection, type: 'Collectible' });
		}
	}, []);

	return (
		<Slider
			style={styles.container}
			slideContainerStyle={styles.slideContainer}
			activeItem={sendScreens[0]}
			items={sendScreens}
		/>
	);
};

export default SendFeature;

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
