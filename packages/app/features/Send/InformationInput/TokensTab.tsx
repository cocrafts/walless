import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Token } from '@walless/core';
import { Select, View } from '@walless/gui';
import { modules } from '@walless/ioc';
import type { TokenDocument } from '@walless/store';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../state';
import { NavButton } from '../components';

import {
	AmountInput,
	Balance,
	RecipientInput,
	TotalCost,
	TransactionFee,
} from './components';

interface Props {
	temp?: string;
	onContinue: () => void;
}

export const TokensTab: FC<Props> = ({ onContinue }) => {
	const { tokens, network } = useSnapshot(injectedElements);
	const { token } = useSnapshot(transactionContext);

	const getRequiredFieldsForSelectToken = (item: Token) => {
		return {
			id: item.metadata?.name || 'unknown',
			name: item.metadata?.name || 'Unknown',
			icon: item.metadata?.imageUri
				? { uri: item.metadata.imageUri }
				: modules.asset.misc.unknownToken,
		};
	};

	return (
		<View style={styles.container}>
			<Select
				title="Select token"
				items={tokens as TokenDocument[]}
				selected={token as TokenDocument}
				onSelect={transactionActions.setToken}
				getRequiredFields={getRequiredFieldsForSelectToken}
			/>

			<RecipientInput />

			<AmountInput />

			<Balance />

			<TransactionFee network={network || (token?.network as never)} />

			<View style={styles.totalLine} />

			<TotalCost />

			<NavButton title="Continue" onPress={onContinue} />
		</View>
	);
};

export default TokensTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		rowGap: 16,
	},
	totalLine: {
		height: 1,
		backgroundColor: '#566674',
		opacity: 0.2,
	},
});
