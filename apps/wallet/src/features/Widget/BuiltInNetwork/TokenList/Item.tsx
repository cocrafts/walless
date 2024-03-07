import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import type { TokenDocumentV2 } from '@walless/store';
import assets from 'utils/assets';
import { formatQuote } from 'utils/format';

interface Props {
	style?: StyleProp<ViewStyle>;
	token: TokenDocumentV2;
	onPress?: () => void;
}

export const TokenItem: FC<Props> = ({ style, token, onPress }) => {
	const { symbol, image, quotes, balance } = token;
	const unitQuote = quotes?.usd;
	const totalQuote = unitQuote && unitQuote * balance;
	const iconSource = image ? { uri: image } : assets.misc.unknownToken;

	const itemName = symbol || 'Unknown';

	return (
		<Hoverable style={[styles.container, style]} onPress={onPress}>
			<Image style={styles.iconImg} source={iconSource} resizeMode="cover" />
			<View style={styles.infoContainer}>
				<Text style={styles.primaryText}>{itemName}</Text>
				<Text style={styles.secondaryText}>{formatQuote(unitQuote)}</Text>
			</View>
			<View style={styles.balanceContainer}>
				<Text style={styles.primaryText}>{balance}</Text>
				<Text style={styles.secondaryText}>
					{formatQuote(totalQuote, unitQuote ? 0 : '-')}
				</Text>
			</View>
		</Hoverable>
	);
};

export default TokenItem;

const iconSize = 32;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#131C24',
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	iconImg: {
		width: iconSize,
		height: iconSize,
		borderRadius: iconSize / 2,
		overflow: 'hidden',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
	infoContainer: {
		flex: 1,
		paddingVertical: 4,
		paddingHorizontal: 12,
		gap: 2,
	},
	balanceContainer: {
		paddingVertical: 4,
		alignItems: 'flex-end',
		gap: 2,
	},
	primaryText: {
		color: 'white',
		fontWeight: '500',
	},
	secondaryText: {
		color: '#566674',
		fontSize: 13,
	},
});
