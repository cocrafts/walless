import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { shortenAddress } from '@walless/core';
import { Image, Stack, Text } from '@walless/gui';
import { Copy } from '@walless/icons';
import { TokenRecord } from '@walless/storage';

import { CardSkin } from './shared';

interface Props {
	index: number;
	skin: CardSkin;
	token: TokenRecord;
}

export const WalletAddress: FC<Props> = ({ index, skin, token }) => {
	const { iconSrc, iconColor = '#ffffff', iconSize } = skin;

	const onCopy = () => {
		navigator.clipboard.writeText(token.id as string);
	};

	return (
		<Stack
			horizontal
			alignSelf="flex-start"
			alignItems="center"
			padding={5}
			backgroundColor="rgba(255, 255, 255, 0.2)"
			borderRadius={30}
		>
			<Stack
				width={iconWrapperSize}
				height={iconWrapperSize}
				borderRadius={iconWrapperSize / 2}
				backgroundColor={iconColor}
				alignItems="center"
				justifyContent="center"
			>
				<Image
					width={iconSize}
					height={iconSize}
					src={iconSrc}
					borderRadius={iconSize / 2}
				/>
			</Stack>
			<Text marginHorizontal={5} fontSize={13}>
				{`Wallet #${index + 1}: ${shortenAddress(token.id as string)}`}
			</Text>
			<TouchableOpacity activeOpacity={0.8} onPress={onCopy}>
				<Stack
					width={iconWrapperSize}
					height={iconWrapperSize}
					alignItems="center"
					justifyContent="center"
				>
					<Stack
						fullscreen
						opacity={0.4}
						backgroundColor="#FFFFFF"
						borderRadius={iconWrapperSize / 2}
					/>
					<Copy size={iconWrapperSize - 8} />
				</Stack>
			</TouchableOpacity>
		</Stack>
	);
};

export default WalletAddress;

const iconWrapperSize = 20;
