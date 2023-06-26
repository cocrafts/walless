import { type FC } from 'react';
import { type CardSkin } from '@walless/app';
import { shortenAddress } from '@walless/core';
import { Copy } from '@walless/icons';
import { Image, Stack, Text } from '@walless/ui';
import { DetailTool } from 'features/home/EditTool/internal';
import TargetWrapper from 'features/home/EditTool/TargetWrapper';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

interface Props {
	skin: CardSkin;
	index: number;
}

export const WalletAddress: FC<Props> = ({ skin, index }) => {
	const { iconSrc, iconColor = '#ffffff', iconSize } = skin;
	const iconWrapperSize = 20;
	const { tools } = useSnapshot(appState);

	return (
		<Stack
			horizontal
			alignSelf="flex-start"
			alignItems="center"
			padding={5}
			backgroundColor="rgba(255, 255, 255, 0.2)"
			borderRadius={30}
		>
			<TargetWrapper isTargeted={tools.target === DetailTool.networks}>
				<Stack
					width={iconWrapperSize}
					height={iconWrapperSize}
					borderRadius={iconWrapperSize / 2}
					backgroundColor={iconColor}
					alignItems="center"
					justifyContent="center"
				>
					<Image
						src={iconSrc}
						width={iconSize}
						height={iconSize}
						borderRadius={1000}
					/>
				</Stack>
			</TargetWrapper>
			<Text marginHorizontal={5} fontSize={13}>{`Wallet #${
				index + 1
			}: ${shortenAddress(`9E5khVvUyy9WC947Di68`)}`}</Text>
			<Stack
				width={iconWrapperSize}
				height={iconWrapperSize}
				alignItems="center"
				justifyContent="center"
			>
				<Stack
					fullscreen
					opacity={0.4}
					backgroundColor="#ffffff"
					borderRadius={iconWrapperSize / 2}
				/>
				<Copy size={iconWrapperSize - 8} />
			</Stack>
		</Stack>
	);
};

export default WalletAddress;
