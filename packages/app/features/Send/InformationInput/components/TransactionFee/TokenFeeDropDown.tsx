import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { Token } from '@walless/core';
import { Hoverable, modalActions, Text, View } from '@walless/gui';
import type { TokenDocument } from '@walless/store';

interface Props {
	tokens: TokenDocument[];
	onSelect: (token: Token) => void;
	selectedToken?: Token;
}

const TokenFeeDropDown: FC<Props> = ({ tokens, onSelect, selectedToken }) => {
	const handleSelectToken = (token: TokenDocument) => {
		onSelect(token);
		modalActions.destroy('NetworkFee');
	};

	return (
		<View style={styles.dropdown}>
			{tokens.map((token, idx) => {
				const name = token.metadata?.symbol || 'Unknown';

				return (
					<Hoverable
						style={[
							styles.tokenOption,
							token === selectedToken && styles.selectedStyle,
						]}
						key={idx}
						onPress={() => handleSelectToken(token)}
					>
						<Image
							source={{
								uri:
									token.metadata?.imageUri ||
									'/img/send-token/unknown-token.jpeg',
							}}
							style={styles.tokenIcon}
						/>
						<Text numberOfLines={1}>{name}</Text>
					</Hoverable>
				);
			})}
		</View>
	);
};

export default TokenFeeDropDown;

const styles = StyleSheet.create({
	dropdown: {
		width: 100,
		backgroundColor: '#1E2830',
		borderRadius: 8,
		paddingVertical: 6,
		paddingHorizontal: 4,
	},
	selectedStyle: {
		backgroundColor: '#56667466',
	},
	tokenOption: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 4,
		paddingHorizontal: 4,
		borderRadius: 4,
		gap: 4,
		overflow: 'hidden',
	},
	tokenIcon: {
		width: 12,
		height: 12,
		borderRadius: 12,
	},
});
