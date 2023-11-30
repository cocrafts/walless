import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { runtime, shortenAddress } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import type { PublicKeyDocument } from '@walless/store';

import type { CardSkin } from './shared';

interface Props {
	index: number;
	skin: CardSkin;
	item: PublicKeyDocument;
	onCopyAddress?: (value: string) => void;
}

export const WalletAddress: FC<Props> = ({
	index,
	item,
	skin,
	onCopyAddress,
}) => {
	const { iconSrc, iconColor = '#ffffff', iconSize } = skin;
	const iconContainerStyle: ViewStyle = {
		width: iconWrapperSize,
		height: iconWrapperSize,
		borderRadius: iconWrapperSize / 2,
		backgroundColor: iconColor,
		alignItems: 'center',
		justifyContent: 'center',
	};
	const iconStyle = {
		width: iconSize,
		height: iconSize,
		borderRadius: iconSize / 2,
	};
	const addressTextStyle = runtime.isMobile
		? { fontSize: 15 }
		: { fontSize: 13 };

	const handleCopy = () => {
		item._id && onCopyAddress?.(item._id);
	};

	return (
		<View style={styles.container}>
			<View style={iconContainerStyle}>
				<Image style={iconStyle} source={iconSrc} />
			</View>
			<Text style={[styles.addressText, addressTextStyle]}>
				{`Wallet #${index + 1}: ${shortenAddress(item._id as string)}`}
			</Text>
			<Hoverable onPress={handleCopy}>
				<View style={styles.iconWrapper}>
					<View fullscreen style={styles.iconInner} />
					<Copy size={iconWrapperSize - 8} />
				</View>
			</Hoverable>
		</View>
	);
};

export default WalletAddress;

const iconWrapperSize = runtime.isMobile ? 30 : 20;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignSelf: 'flex-start',
		alignItems: 'center',
		padding: 5,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderRadius: 30,
	},
	addressText: {
		marginHorizontal: 5,
		color: 'white',
	},
	iconWrapper: {
		width: iconWrapperSize,
		height: iconWrapperSize,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconInner: {
		opacity: 0.4,
		backgroundColor: '#FFFFFF',
		borderRadius: iconWrapperSize / 2,
	},
});
