import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { TokenDocumentV2 } from '@walless/store';

import TokenList from './TokenList';

interface Props {
	tokens: TokenDocumentV2[];
}

export const TokenTab: FC<Props> = ({ tokens }) => {
	return <TokenList items={tokens} style={styles.tokenListContainer} />;
};

export default TokenTab;

const styles = StyleSheet.create({
	tokenListContainer: {
		marginVertical: 16,
		borderRadius: 12,
		overflow: 'hidden',
	},
});
