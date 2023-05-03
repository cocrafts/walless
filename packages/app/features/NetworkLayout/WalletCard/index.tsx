import { type FC, useState } from 'react';
import {
	type ImageStyle,
	type ViewStyle,
	Image,
	ImageBackground,
	StyleSheet,
} from 'react-native';
import { View } from '@walless/gui';
import { type TokenRecord } from '@walless/storage';

import WalletAddress from './Address';
import WalletBalance from './Balance';
import { CardSkin } from './shared';

interface Props {
	style?: ViewStyle;
	index?: number;
	width?: number;
	skin: CardSkin;
	token: TokenRecord;
}

export const WalletCard: FC<Props> = ({
	index = 0,
	width = 312,
	skin,
	token,
}) => {
	const [isPrivate, setIsPrivate] = useState(false);
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
		setIsPrivate(next);
	};

	return (
		<ImageBackground style={containerStyle} source={skin.backgroundSrc}>
			<WalletAddress index={index} skin={skin} token={token} />
			<WalletBalance token={token} isPrivate={isPrivate} onHide={handleHide} />
			<View style={styles.markContainer}>
				<Image style={styles.markImage} source={skin.largeIconSrc} />
			</View>
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
