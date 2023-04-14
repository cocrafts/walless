import { FC, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
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
}

export const WalletCard: FC<Props> = ({
	backgroundSrc,
	iconSrc,
	iconSize = 20,
	index,
	address,
	balance = 0,
	price = 22,
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
				<Text marginHorizontal={5} fontSize={13}>
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

			<Stack marginVertical={5}>
				<Stack horizontal alignItems="center" gap={10}>
					<Text fontSize={38} fontWeight={'500'}>{`${
						isPrivate ? '***' : balance
					} SOL`}</Text>
					<TouchableOpacity activeOpacity={0.7} onPress={onEyePress}>
						{isPrivate ? <EyeOff size={20} /> : <Eye size={20} />}
					</TouchableOpacity>
				</Stack>
				<Text opacity={0.7}>{`~ ${
					isPrivate ? '***' : balance * price
				} USD`}</Text>
			</Stack>
		</ImageBackground>
	);
};

export default WalletCard;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 15,
		aspectRatio: 318 / 145,
		borderRadius: 15,
		overflow: 'hidden',
		padding: 20,
		alignItems: 'flex-start',
	},
});
