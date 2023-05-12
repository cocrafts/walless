import { type FC } from 'react';
import {
	type StyleProp,
	type ViewStyle,
	Image,
	StyleSheet,
} from 'react-native';
import { shortenAddress } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import { type TokenDocument } from '@walless/store';

import { formatTokenValue } from '../../utils/format';

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
			<Image style={styles.iconImg} source={iconSource} resizeMode="cover" />

			<View style={styles.infoContainer}>
				<Text style={styles.whiteBold}>
					{symbol || name || shortenAddress(account.mint)}
				</Text>
			</View>
			<View style={styles.balanceContainer}>
				<Text style={styles.whiteBold}>{formatTokenValue(account)}</Text>
			</View>
		</Hoverable>
	);
};

export default TokenItem;

const iconSize = 28;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#131C24',
		paddingVertical: 12,
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
	},
	balanceContainer: {
		paddingVertical: 4,
	},
	whiteBold: {
		color: 'white',
		fontWeight: '600',
	},
});
