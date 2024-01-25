import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SlideComponentProps } from '@walless/gui';
import { View } from '@walless/gui';
import { NavButton } from 'components/NavButton';
import { navigationRef } from 'utils/navigation';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

import { Header } from './Header';
import { Information } from './Information';
import { Nft } from './Nft';
import { Token } from './Token';

type Props = SlideComponentProps;

const TransactionResult: FC<Props> = ({ navigator }) => {
	const { type } = useSnapshot(txContext).tx;

	const handlePressOtherTransaction = () => {
		txActions.resetTransactionContext();
		navigator.slideTo(0);
	};

	const handleBackToHome = () => {
		navigationRef.reset({
			index: 1,
			routes: [
				{ name: 'Dashboard' },
				{
					name: 'Dashboard',
					params: {
						screen: 'Home',
					},
				},
			],
		});
		txActions.resetTransactionContext();
		txActions.closeSendFeature();
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
					onPress={handleBackToHome}
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
