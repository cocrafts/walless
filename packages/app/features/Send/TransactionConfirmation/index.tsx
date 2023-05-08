import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { SliderHandle, View } from '@walless/gui';

import { NavButton } from '../components';

import { RecipientInfor } from './components/RecipientInfor';
import { SenderInfor } from './components/SenderInfor';
import { BigToken, Header } from './components';

interface Props {
	navigator: SliderHandle;
}

const TransactionConfirmation: FC<Props> = ({ navigator }) => {
	return (
		<View style={styles.container}>
			<Header onBack={() => navigator.slideBack()} />

			<BigToken />

			<SenderInfor />

			<RecipientInfor />

			<NavButton title="Continue" onPress={() => navigator.slideNext()} />
		</View>
	);
};

export default TransactionConfirmation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 336,
		gap: 14,
	},
});
