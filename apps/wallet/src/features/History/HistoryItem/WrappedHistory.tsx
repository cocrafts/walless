import type { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Hoverable } from '@walless/gui';
import type { TransactionHistoryDocument } from '@walless/store';
import { showTransactionDetailsModal } from 'modals/TransactionDetailsModal';

interface Props {
	transaction: TransactionHistoryDocument;
	onPress?: () => void;
	children: ReactNode;
}

export const WrappedHistory: FC<Props> = ({
	transaction,
	onPress,
	children,
}) => {
	return (
		<Hoverable
			style={styles.container}
			onPress={() =>
				onPress ? onPress() : showTransactionDetailsModal({ transaction })
			}
		>
			<View style={styles.contentContainer}>{children}</View>
		</Hoverable>
	);
};

export default WrappedHistory;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: 'row',
		overflow: 'hidden',
	},
	contentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'stretch',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#131C24',
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
});
