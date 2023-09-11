import type { FC } from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import type { PublicKeyDocument } from '@walless/store';

import WalletAddress from './Address';
import WalletBalance from './Balance';
import type { CardSkin } from './shared';

interface Props {
	style?: ViewStyle;
	width?: number;
	index?: number;
	item: PublicKeyDocument;
	skin: CardSkin;
	valuation?: number;
	hideBalance: boolean;
	onCopyAddress?: (value: string) => void;
	onChangePrivateSetting?: (value: boolean) => void;
}

export const WalletCard: FC<Props> = ({
	width = 312,
	index = 0,
	item,
	skin,
	valuation = 0,
	hideBalance,
	onCopyAddress,
	onChangePrivateSetting,
}) => {
	const height = (width * 145) / 318;
	const containerStyle: ImageStyle = {
		width,
		height,
		aspectRatio: 318 / 145,
		borderRadius: 12,
		paddingHorizontal: 18,
		justifyContent: 'center',
		overflow: 'hidden',
	};

	const handleHide = (next: boolean) => {
		onChangePrivateSetting?.(next);
	};

	console.log(skin.largeIconSrc);

	return (
		<ImageBackground style={containerStyle} source={skin.backgroundSrc}>
			<WalletAddress
				index={index}
				item={item}
				skin={skin}
				onCopyAddress={onCopyAddress}
			/>
			<WalletBalance
				hideBalance={hideBalance}
				valuation={valuation}
				onHide={handleHide}
			/>
			{skin.largeIconSrc && (
				<View style={styles.markContainer}>
					<Image style={styles.markImage} source={skin.largeIconSrc} />
				</View>
			)}
		</ImageBackground>
	);
};

export default WalletCard;

const styles = StyleSheet.create({
	markContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: -34,
		justifyContent: 'center',
	},
	markImage: {
		width: 130,
		height: 130,
	},
});

export * from './shared';
