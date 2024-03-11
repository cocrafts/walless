import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { SliderHandle } from '@walless/gui';
import { View } from '@walless/gui';
import KeyboardAvoidingView from 'components/KeyboardAvoidingView';
import ModalHeader from 'components/ModalHeader';
import { keyState } from 'state/keys';
import { useTokens } from 'utils/hooks';

import { txActions, useTransactionContext } from '../internal';

import { NftTab } from './NftsTab';
import { TabBar } from './TabBar';
import { TokensTab } from './TokensTab';

interface Props {
	navigator: SliderHandle;
}

const InputTransaction: FC<Props> = ({ navigator }) => {
	const { type, network, tokenForFee } = useTransactionContext();
	const { tokens } = useTokens(network);

	useEffect(() => {
		if (!network) return;
		if (!tokenForFee) txActions.update({ tokenForFee: tokens[0] });

		const publicKeys = Array.from(keyState.map.values());
		const key = publicKeys.find((k) => k.network === network);
		if (key) txActions.update({ sender: publicKeys[0]._id });
	}, [network]);

	return (
		<KeyboardAvoidingView>
			<View style={styles.container}>
				<ModalHeader content="Send" onPressClose={txActions.closeSendFeature} />

				<TabBar />

				{type === 'token' ? (
					<TokensTab onContinue={navigator.slideNext} />
				) : (
					<NftTab onContinue={navigator.slideNext} />
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
