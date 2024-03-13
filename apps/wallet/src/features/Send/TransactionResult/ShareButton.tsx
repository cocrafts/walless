import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Anchor } from '@walless/gui';
import { getDefaultEngine } from 'engine';
import type { SolanaContext } from 'engine/runners';

import type { SolanaTokenTransactionContext } from '../internal';
import { useTransactionContext } from '../internal';

export const SolanaShareButton = () => {
	const { signature } = useTransactionContext<SolanaTokenTransactionContext>();
	const engine = getDefaultEngine();
	const { cluster } = engine.getContext<SolanaContext>(Networks.solana);

	return (
		<Anchor
			style={styles.shareButton}
			title="View on Solscan"
			href={`https://solscan.io/tx/${signature}?cluster=${cluster}`}
		/>
	);
};

const styles = StyleSheet.create({
	shareButton: {
		borderRadius: 10,
		paddingHorizontal: 30,
		paddingVertical: 5,
	},
});
