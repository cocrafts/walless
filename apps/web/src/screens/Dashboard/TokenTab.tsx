import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { TokenList } from '@walless/app';
import { View } from '@walless/gui';

export const TokenTab: FC = () => {
	return (
		<View>
			<TokenList contentContainerStyle={styles.tokenListInner} />
		</View>
	);
};

export default TokenTab;

const styles = StyleSheet.create({
	tokenListInner: {
		paddingVertical: 12,
	},
});
