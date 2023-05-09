import { type FC } from 'react';
import {
	type StyleProp,
	type ViewStyle,
	Image,
	StyleSheet,
} from 'react-native';
import { shortenAddress, TokenAccount } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import { type TokenDocument } from '@walless/store';

const formatTokenValue = (item: TokenAccount) => {
	return parseFloat(item.balance) / 10 ** item.decimals;
};

interface Props {
	style?: StyleProp<ViewStyle>;
	index: number;
	item: TokenDocument;
}

export const TokenItem: FC<Props> = ({ style, item }) => {
	const { metadata = {}, account } = item;
	const { name, symbol, imageUri } = metadata;
	const iconSource = {
		uri: imageUri || '/img/question.png',
	};

	return (
		<Hoverable style={[styles.container, style]}>
			<View>
				<View style={styles.iconWrapper}>
					<Image
						style={styles.iconImg}
						source={iconSource}
						resizeMode="cover"
					/>
				</View>
			</View>
			<View style={styles.infoContainer}>
				<Text>{symbol || name || shortenAddress(account.mint)}</Text>
			</View>
			<View style={styles.balanceContainer}>
				<Text>{formatTokenValue(account)}</Text>
			</View>
		</Hoverable>
	);
};

export default TokenItem;

const iconSize = 40;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#131C24',
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	iconImg: {
		width: iconSize,
		height: iconSize,
		borderRadius: iconSize / 2,
		overflow: 'hidden',
	},
	iconWrapper: {
		width: iconSize,
		height: iconSize,
		borderRadius: iconSize / 2,
		backgroundColor: '#202634',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoContainer: {
		flex: 1,
		paddingVertical: 4,
		paddingHorizontal: 12,
	},
	balanceContainer: {
		paddingVertical: 4,
	},
});
