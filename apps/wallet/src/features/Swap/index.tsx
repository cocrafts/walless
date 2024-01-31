import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import ModalHeader from 'components/ModalHeader';

export type Props = {
	network: Networks;
	onPressClose?: () => void;
};

const SwapFeature: FC<Props> = ({ network, onPressClose }) => {
	const handleClose = () => {
		onPressClose?.();
	};

	return (
		<View style={styles.container}>
			<ModalHeader content="Swap" onPressClose={handleClose} />
			<Text>Swap on {network}</Text>
		</View>
	);
};

export default SwapFeature;

const styles = StyleSheet.create({
	container: {},
});
