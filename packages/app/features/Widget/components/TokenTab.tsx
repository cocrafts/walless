import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TokenList } from '@walless/app';
import type { TokenDocument } from '@walless/store';

interface Props {
	tokens: TokenDocument[];
}

export const TokenTab: FC<Props> = ({ tokens }) => {
	return <TokenList items={tokens} style={styles.tokenListContainer} />;
};

export default TokenTab;

const styles = StyleSheet.create({
	tokenListContainer: {
		marginTop: 12,
	},
});
