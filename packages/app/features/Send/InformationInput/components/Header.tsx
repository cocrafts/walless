import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
} from '../../../../state/transaction';

export const Header: FC = () => {
	const { handleClose } = useSnapshot(injectedElements);

	const handleCloseExtended = () => {
		transactionActions.resetTransactionContext();
		handleClose();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Send</Text>
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
		paddingBottom: 28,
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
