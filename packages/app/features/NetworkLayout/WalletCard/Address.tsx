import { FC } from 'react';
import { type ViewStyle, Image, StyleSheet } from 'react-native';
import { shortenAddress } from '@walless/core';
import {
	BindDirections,
	Hoverable,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { Copy } from '@walless/icons';
import { TokenRecord } from '@walless/storage';

import Notification from '../../../components/Notification';

import { CardSkin } from './shared';

interface Props {
	index: number;
	skin: CardSkin;
	token: TokenRecord;
}

export const WalletAddress: FC<Props> = ({ index, skin, token }) => {
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

	const onCopy = () => {
		navigator.clipboard.writeText(token.id as string);

		const StyledCopy = () => <Copy size={18} color="#FFFFFF" />;

		modalActions.show({
			id: 'copied_announcement',
			component: Notification,
			bindingDirection: BindDirections.InnerTopRight,
			positionOffset: { x: 0, y: 20 },
			maskActiveOpacity: 0,
			context: {
				prefix: StyledCopy,
				message: 'Copied',
			},
		});

		setTimeout(() => {
			modalActions.hide('copied_announcement');
		}, 1000);
	};

	return (
		<View style={styles.container}>
			<View style={iconContainerStyle}>
				<Image style={iconStyle} source={iconSrc} />
			</View>
			<Text style={styles.addressText}>
				{`Wallet #${index + 1}: ${shortenAddress(token.id as string)}`}
			</Text>
			<Hoverable onPress={onCopy}>
				<View style={styles.iconWrapper}>
					<View fullScreen style={styles.iconInner} />
					<Copy size={iconWrapperSize - 8} />
				</View>
			</Hoverable>
		</View>
	);
};

export default WalletAddress;

const iconWrapperSize = 20;

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
		fontSize: 13,
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
