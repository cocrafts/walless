import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SlideComponentProps } from '@walless/gui';
import { View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../state';
import { NavButton } from '../components';

import { Header, Information, Nft, Token } from './components';

type Props = SlideComponentProps;

const TransactionResult: FC<Props> = ({ navigator }) => {
	const { handleClose } = useSnapshot(injectedElements);
	const { type } = useSnapshot(transactionContext);

	const handlePressOtherTransaction = () => {
		transactionActions.resetTransactionContext();
		navigator.slideTo(0);
	};

	return (
		<View style={styles.container}>
			<Header />

			{type === 'Token' ? <Token /> : <Nft />}

			<Information />

			<View style={styles.buttonBlock}>
				<NavButton
					style={styles.otherButton}
					onPress={handlePressOtherTransaction}
					title={'Other transaction'}
				/>
				<NavButton
					style={styles.backButton}
					onPress={handleClose}
					title={'Back to home'}
				/>
			</View>
		</View>
	);
};

export default TransactionResult;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
	},
	buttonBlock: {
		marginTop: 'auto',
		flexDirection: 'row',
		gap: 10,
	},
	otherButton: {
		flex: 1,
		backgroundColor: 'none',
		borderWidth: 1,
		borderColor: '#566674',
	},
	backButton: {
		flex: 1,
	},
});
