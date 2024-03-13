import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';

import { txActions, useTransactionContext } from '../internal';

export const SolanaHeader = () => {
	const { status } = useTransactionContext();

	const title =
		status === 'success' ? 'Transaction successful' : 'Transaction failed';

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Button style={styles.closeButton} onPress={txActions.closeSendFeature}>
				<Times size={16} />
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
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
