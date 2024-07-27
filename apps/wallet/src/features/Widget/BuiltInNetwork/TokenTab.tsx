import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks, Token } from '@walless/core';
import type { TokenDocument } from '@walless/store';
import { useTokens } from 'utils/hooks';

import TokenList from './TokenList';

interface Props {
	network: Networks;
	tokens?: TokenDocument<Token>[];
}

export const TokenTab: FC<Props> = ({ network, tokens }) => {
	const { tokens: networkTokens } = useTokens(network);

	return (
		<TokenList
			items={tokens ? tokens : networkTokens}
			style={styles.tokenListContainer}
		/>
	);
};

export default TokenTab;

const styles = StyleSheet.create({
	tokenListContainer: {
		marginVertical: 16,
		overflow: 'hidden',
	},
});
