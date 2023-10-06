import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Token } from '@walless/core';
import { Hoverable, modalActions, Text, View } from '@walless/gui';
import type { TokenDocument } from '@walless/store';

interface Props {
	tokens: TokenDocument[];
	onSelect: (token: Token) => void;
}

const TokenFeeDropDown: FC<Props> = ({ tokens, onSelect }) => {
	const handleSelectToken = (token: TokenDocument) => {
		onSelect(token);
		modalActions.destroy('NetworkFee');
	};

	return (
		<View style={styles.dropdown}>
			{tokens.map((token, idx) => (
				<Hoverable
					style={styles.tokenOption}
					key={idx}
					onPress={() => handleSelectToken(token)}
				>
					<Text>{token.metadata?.symbol}</Text>
				</Hoverable>
			))}
		</View>
	);
};

export default TokenFeeDropDown;

const styles = StyleSheet.create({
	dropdown: {
		width: 50,
		backgroundColor: '#566674',
		borderRadius: 8,
	},
	tokenOption: {
		borderRadius: 8,
		padding: 4,
	},
});
