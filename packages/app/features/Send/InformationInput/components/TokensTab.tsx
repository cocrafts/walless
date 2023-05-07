import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Token } from '@walless/core';
import { Input, Select, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../state/transaction';
import { NavButton } from '../../components';

import { NetworkFee } from './NetworkFee';
import { RecipientInput } from './RecipientInput';
import { TotalCost } from './TotalCost';

interface Props {
	temp?: string;
	onContinue: () => void;
}

export const TokensTab: FC<Props> = ({ onContinue }) => {
	const { tokens } = useSnapshot(injectedElements);
	const { token } = useSnapshot(transactionContext);

	const getRequiredFieldsForSelectToken = (item: Token) => {
		return {
			id: item.metadata?.name as string,
			name: item.metadata?.name as string,
			icon: item.metadata?.imageUri as string,
		};
	};

	return (
		<View style={styles.container}>
			<Select
				title="Select token"
				items={tokens as Token[]}
				selected={token as Token}
				getRequiredFields={getRequiredFieldsForSelectToken}
				onSelect={transactionActions.setToken}
			/>

			<RecipientInput />

			<Input
				placeholder="Token amount"
				onChangeText={transactionActions.setAmount}
			/>

			<NetworkFee />

			<View style={styles.totalLine} />

			<TotalCost costText="1000.1 SOL" />

			<NavButton title="Continue" onPress={onContinue} />
		</View>
	);
};

export default TokensTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 12,
	},
	totalLine: {
		width: 336,
		height: 1,
		backgroundColor: '#566674',
	},
});
