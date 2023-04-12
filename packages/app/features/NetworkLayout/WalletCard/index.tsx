import { FC, useState } from 'react';
import {
	ImageBackground,
	LayoutRectangle,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Image, Stack, Text } from '@walless/gui';
import { Copy, Eye, EyeOff } from '@walless/icons';

import { shortenAddress } from '../../../utils/helper';

interface Props {
	backgroundSrc?: string;
	iconSrc?: string;
	iconSize?: number;
	index?: number;
	address?: string;
	balance?: number;
	price?: number;
	getCardLayout?: (layout: LayoutRectangle) => void;
}

export const WalletCard: FC<Props> = ({
	backgroundSrc,
	iconSrc,
	iconSize = 20,
	index,
	address,
	balance = 0,
	price = 22,
	getCardLayout,
}) => {
	const [isPrivate, setIsPrivate] = useState(false);
	const backgroundUri = { uri: backgroundSrc };
	const iconUri = { uri: iconSrc };

	const onEyePress = () => {
		setIsPrivate(!isPrivate);
	};

	const onCopy = () => {
		navigator.clipboard.writeText(address as string);
	};

	return (
		<Stack
			paddingLeft={15}
			minWidth={330}
			onLayout={({ nativeEvent: { layout } }) => getCardLayout?.(layout)}
		>
			<ImageBackground source={backgroundUri} style={styles.container}>
				<Stack horizontal alignItems="center" padding={5}>
					<Stack
						fullscreen
						opacity={0.2}
						backgroundColor="#FFFFFF"
						borderRadius={15}
					/>
					<Image
						src={iconUri}
						width={iconSize}
						height={iconSize}
						borderRadius={iconSize / 2}
					/>
					<Text marginHorizontal={5} fontSize={13} color="#FFFFFF">
						{`Wallet #${index}: ${shortenAddress(address as string)}`}
					</Text>
					<TouchableOpacity activeOpacity={0.7} onPress={onCopy}>
						<Stack
							width={iconSize}
							height={iconSize}
							alignItems="center"
							justifyContent="center"
						>
							<Stack
								fullscreen
								opacity={0.4}
								backgroundColor="#FFFFFF"
								borderRadius={iconSize / 2}
							/>
							<Copy size={iconSize - 8} />
						</Stack>
					</TouchableOpacity>
				</Stack>
				<Stack marginTop={10}>
					<Stack horizontal alignItems="center" gap={10}>
						<Text fontSize={38} fontWeight={'500'} color="#FFFFFF">{`${
							isPrivate ? '***' : balance
						} SOL`}</Text>
						<TouchableOpacity activeOpacity={0.7} onPress={onEyePress}>
							{isPrivate ? <EyeOff size={20} /> : <Eye size={20} />}
						</TouchableOpacity>
					</Stack>
					<Text opacity={0.7} color="#FFFFFF">{`~ ${
						isPrivate ? '***' : balance * price
					} USD`}</Text>
				</Stack>
			</ImageBackground>
		</Stack>
	);
};

export default WalletCard;

const styles = StyleSheet.create({
	container: {
		aspectRatio: 318 / 145,
		borderRadius: 15,
		overflow: 'hidden',
		paddingHorizontal: 15,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
});
