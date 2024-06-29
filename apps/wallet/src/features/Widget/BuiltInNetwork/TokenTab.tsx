import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { useTokens } from 'utils/hooks';

import TokenList from './TokenList';

interface Props {
	network: Networks;
}

export const TokenTab: FC<Props> = ({ network }) => {
	const { tokens } = useTokens(network);

	return <TokenList items={tokens} style={styles.tokenListContainer} />;
};

export default TokenTab;

const styles = StyleSheet.create({
	tokenListContainer: {
		marginVertical: 16,
		overflow: 'hidden',
	},
});
