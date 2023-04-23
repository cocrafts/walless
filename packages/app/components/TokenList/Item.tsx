import { type FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { shortenAddress } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import { TokenDocument } from '@walless/store';
import { resources } from 'utils/config';

interface Props {
	index: number;
	item: TokenDocument;
}

export const TokenItem: FC<Props> = ({ item, index }) => {
	const { metadata = {}, account } = item;
	const { name, symbol, imageUri } = metadata;
	const iconSource = {
		uri: imageUri || resources.common.question.uri,
	};

	return (
		<Hoverable style={styles.container}>
			<View>
				<View style={styles.iconWrapper}>
					<Image style={styles.iconImg} source={iconSource} />
				</View>
			</View>
			<View style={styles.infoContainer}>
				<Text>{symbol || name || shortenAddress(account.address)}</Text>
			</View>
			<View style={styles.balanceContainer}>
				<Text>{account.balance / account.decimal}</Text>
			</View>
		</Hoverable>
	);
};

export default TokenItem;

const iconSize = 28;
const iconWrapperSize = iconSize + 12;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#131C24',
		borderRadius: 12,
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	iconImg: {
		width: iconSize,
		height: iconSize,
	},
	iconWrapper: {
		width: iconWrapperSize,
		height: iconWrapperSize,
		borderRadius: iconWrapperSize / 2,
		backgroundColor: '#202634',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoContainer: {
		flex: 1,
		paddingHorizontal: 12,
	},
	balanceContainer: {},
});
