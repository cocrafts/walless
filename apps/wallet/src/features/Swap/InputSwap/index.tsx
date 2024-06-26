import { type FC, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import type { SlideComponentProps } from '@walless/gui';
import { Button, View } from '@walless/gui';
import ModalHeader from 'components/ModalHeader';
import { showError } from 'modals/Error';
import { usePublicKeys, useSnapshot } from 'utils/hooks';

import { swapActions, swapContext } from '../context';

import FromToken from './FromToken';
import SwitchSeparator from './SwitchSeparator';
import ToToken from './ToToken';

type Props = SlideComponentProps;

const InputSwap: FC<Props> = ({ navigator }) => {
	const { network } = useSnapshot(swapContext).swap;
	const publicKeys = usePublicKeys(network);
	const [loading, setLoading] = useState(false);

	const handlePressSwap = async () => {
		setLoading(true);
		try {
			swapActions.prepareSwapTransaction(publicKeys[0]._id);
			navigator.slideNext();
		} catch (error) {
			showError({ errorText: (error as Error).message });
		}
		setLoading(false);
	};

	const handleClose = () => {
		swapActions.closeSwap();
		// TODO: need to resolve this timeout by modal life cycle
		setTimeout(() => {
			swapActions.resetContext();
		}, 200);
	};

	return (
		<View style={styles.container}>
			<ModalHeader content="Swap" onPressClose={handleClose} />

			<View style={styles.swapContainer}>
				<FromToken />
				<SwitchSeparator />
				<ToToken />
			</View>

			{loading ? (
				<ActivityIndicator />
			) : (
				<Button title="Swap" onPress={handlePressSwap} />
			)}
		</View>
	);
};

export default InputSwap;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
	swapContainer: {
		backgroundColor: '#1F2A34',
		borderWidth: 1,
		borderColor: '#566674',
		borderRadius: 15,
		paddingVertical: 20,
		paddingHorizontal: 16,
		gap: 10,
		marginBottom: 'auto',
	},
});
