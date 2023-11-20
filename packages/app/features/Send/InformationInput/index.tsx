import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SliderHandle } from '@walless/gui';
import { View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import {
	transactionActions,
	transactionContext,
} from '../../../state/transaction';
import { showError } from '../utils';

import { CollectiblesTab } from './CollectiblesTab';
import { Header, TabBar } from './components';
import { totalCheckFieldsToContinue } from './internal';
import { TokensTab } from './TokensTab';

interface Props {
	navigator: SliderHandle;
}

const InformationInput: FC<Props> = ({ navigator }) => {
	const { type } = useSnapshot(transactionContext);

	const handlePressContinue = () => {
		const checkedResult = totalCheckFieldsToContinue();
		if (!checkedResult.valid) {
			showError(checkedResult.message);
		} else {
			navigator.slideNext();
		}
	};

	return (
		<View style={styles.container}>
			<Header />

			<TabBar curTab={type} setCurTab={transactionActions.setType} />

			{type === 'Token' ? (
				<TokensTab onContinue={handlePressContinue} />
			) : (
				<CollectiblesTab onContinue={handlePressContinue} />
			)}
		</View>
	);
};

export default InformationInput;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
