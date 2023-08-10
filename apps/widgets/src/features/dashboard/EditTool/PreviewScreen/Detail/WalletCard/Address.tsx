import type { FC } from 'react';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import type { CardSkin } from '@walless/app';
import { shortenAddress } from '@walless/core';
import { Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import { DetailTool } from 'features/dashboard/EditTool/internal';
import TargetWrapper from 'features/dashboard/EditTool/TargetWrapper';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

interface Props {
	skin: CardSkin;
	index: number;
}

export const WalletAddress: FC<Props> = ({ skin, index }) => {
	const { tools } = useSnapshot(appState);
	const { iconSrc, iconSize } = skin;

	return (
		<View horizontal style={styles.container}>
			<TargetWrapper isTargeted={tools.target === DetailTool.icon}>
				<Image
					source={iconSrc}
					style={{
						width: iconSize,
						height: iconSize,
						borderRadius: 1000,
					}}
				/>
			</TargetWrapper>

			<Text style={styles.address}>{`Wallet #${index + 1}: ${shortenAddress(
				`9E5khVvUyy9WC947Di68`,
			)}`}</Text>

			<View style={styles.copy}>
				<View style={styles.copyBackground} />
				<Copy size={12} />
			</View>
		</View>
	);
};

export default WalletAddress;

const styles = StyleSheet.create({
	container: {
		padding: 5,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderRadius: 30,
		alignItems: 'center',
		gap: 6,
		marginRight: 'auto',
	},
	address: {
		color: '#ffffff',
		fontSize: 13,
	},
	copy: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 4,
	},
	copyBackground: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#ffffff',
		opacity: 0.4,
		position: 'absolute',
	},
});
