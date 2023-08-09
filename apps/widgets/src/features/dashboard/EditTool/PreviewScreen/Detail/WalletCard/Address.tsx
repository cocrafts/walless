import type { FC } from 'react';
import { Image } from 'react-native';
import type { CardSkin } from '@walless/app';
import { shortenAddress } from '@walless/core';
import { Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import TargetWrapper from 'features/dashboard/EditTool/TargetWrapper';

interface Props {
	skin: CardSkin;
	index: number;
}

export const WalletAddress: FC<Props> = ({ skin, index }) => {
	const { iconSrc, iconSize } = skin;

	return (
		<View>
			<TargetWrapper isTargeted={true}>
				<View>
					<Image
						source={iconSrc}
						style={{
							width: iconSize,
							height: iconSize,
						}}
						borderRadius={1000}
					/>
				</View>
			</TargetWrapper>
			<Text>{`Wallet #${index + 1}: ${shortenAddress(
				`9E5khVvUyy9WC947Di68`,
			)}`}</Text>
			<View>
				<View />
				<Copy />
			</View>
		</View>
	);
};

export default WalletAddress;
