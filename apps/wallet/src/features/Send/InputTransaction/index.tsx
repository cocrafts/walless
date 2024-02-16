import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { SliderHandle } from '@walless/gui';
import { View } from '@walless/gui';
import KeyboardAvoidingView from 'components/KeyboardAvoidingView';
import ModalHeader from 'components/ModalHeader';
import { useNfts } from 'utils/hooks';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

import { CollectiblesTab } from './CollectiblesTab';
import { TabBar } from './TabBar';
import { TokensTab } from './TokensTab';

interface Props {
	navigator: SliderHandle;
}

const InputTransaction: FC<Props> = ({ navigator }) => {
	const { tx } = useSnapshot(txContext);
	const { type, collectible } = tx;
	const { collections } = useNfts();

	useEffect(() => {
		if (collectible) {
			const collection = collections.find(
				(ele) => ele._id === collectible.collectionId,
			);
			txActions.update({ type: 'Collectible', collection });
		}
	}, [collectible]);

	return (
		<KeyboardAvoidingView>
			<View style={styles.container}>
				<ModalHeader content="Send" onPressClose={txActions.closeSendFeature} />

				<TabBar
					curTab={type}
					setCurTab={(type) => txActions.update({ type })}
				/>

				{type === 'Token' ? (
					<TokensTab onContinue={navigator.slideNext} />
				) : (
					<CollectiblesTab onContinue={navigator.slideNext} />
				)}
			</View>
		</KeyboardAvoidingView>
	);
};

export default InputTransaction;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
