import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SliderHandle } from '@walless/gui';
import { View } from '@walless/gui';
import ModalHeader from 'components/ModalHeader';
import { showError } from 'state/float/system';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

import { CollectiblesTab } from './CollectiblesTab';
import { totalCheckFieldsToContinue } from './internal';
import { TabBar } from './TabBar';
import { TokensTab } from './TokensTab';

interface Props {
	navigator: SliderHandle;
}

const InputTransaction: FC<Props> = ({ navigator }) => {
	const { type } = useSnapshot(txContext);

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
			<ModalHeader content="Send" onPressClose={txActions.closeSendFeature} />

			<TabBar curTab={type} setCurTab={txActions.setType} />

			{type === 'Token' ? (
				<TokensTab onContinue={handlePressContinue} />
			) : (
				<CollectiblesTab onContinue={handlePressContinue} />
			)}
		</View>
	);
};

export default InputTransaction;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
