import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { ChevronLeft, Times } from '@walless/icons';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
} from '../../../../state/transaction';

interface Props {
	onBack: () => void;
}

export const Header: FC<Props> = ({ onBack }) => {
	const { handleClose } = useSnapshot(injectedElements);

	const handleCloseExtended = () => {
		transactionActions.resetTransactionContext();
		handleClose();
	};

	return (
		<View style={styles.container}>
			<Button style={styles.closeButton} onPress={onBack}>
				<ChevronLeft size={16} />
			</Button>
			<Text style={styles.title}>Confirm transaction</Text>
			<Button style={styles.closeButton} onPress={handleCloseExtended}>
				<Times size={16} />
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: 336,
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 20,
	},
	closeButton: {
		backgroundColor: 'none',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
