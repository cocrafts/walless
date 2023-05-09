import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../state/transaction';

export const Header = () => {
	const { handleClose } = useSnapshot(injectedElements);

	const { signatureString } = useSnapshot(transactionContext);

	const handleCloseExtended = () => {
		transactionActions.resetTransactionContext();
		handleClose();
	};

	let title = 'Transaction failed';
	if (signatureString.length > 0) title = 'Transaction successful';

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Button style={styles.closeButton} onPress={handleCloseExtended}>
				<Times size={16} />
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 336,
		justifyContent: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	closeButton: {
		position: 'absolute',
		right: 0,
		backgroundColor: 'none',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
