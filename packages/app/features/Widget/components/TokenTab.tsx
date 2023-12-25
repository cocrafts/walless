import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { TokenDocument } from '@walless/store';

import TokenList from '../../../components/TokenList';

interface Props {
	tokens: TokenDocument[];
}

export const TokenTab: FC<Props> = ({ tokens }) => {
	return <TokenList items={tokens} style={styles.tokenListContainer} />;
};

export default TokenTab;

const styles = StyleSheet.create({
	tokenListContainer: {
		marginTop: 16,
		borderRadius: 12,
		overflow: 'hidden',
	},
});
