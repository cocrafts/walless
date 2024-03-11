import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SliderHandle } from '@walless/gui';
import { View } from '@walless/gui';
import { NavButton } from 'components/NavButton';

import { useTransactionContext } from '../internal';

import { Header } from './Header';
import { NFTHeader } from './NFTHeader';
import { RecipientInfo } from './RecipientInfo';
import { SenderInfo } from './SenderInfo';
import { TokenHeader } from './TokenHeader';

interface Props {
	navigator: SliderHandle;
}

const TransactionConfirmation: FC<Props> = ({ navigator }) => {
	const { type } = useTransactionContext();

	const handleContinue = async () => {
		navigator.slideNext();
	};

	return (
		<View style={styles.container}>
			<Header onBack={navigator.slideBack} />
			{type === 'token' ? <TokenHeader /> : <NFTHeader />}
			<SenderInfo />
			<RecipientInfo />
			<NavButton title="Confirm" onPress={handleContinue} />
		</View>
	);
};

export default TransactionConfirmation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 14,
	},
});
