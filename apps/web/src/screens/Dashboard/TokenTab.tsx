import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { TokenList } from '@walless/app';
import { View } from '@walless/gui';
import { type TokenDocument } from '@walless/store';

interface Props {
	tokens: TokenDocument[];
}

export const TokenTab: FC<Props> = ({ tokens }) => {
	return (
		<View>
			<TokenList items={tokens} contentContainerStyle={styles.tokenListInner} />
		</View>
	);
};

export default TokenTab;

const styles = StyleSheet.create({
	tokenListInner: {
		paddingVertical: 12,
	},
});
