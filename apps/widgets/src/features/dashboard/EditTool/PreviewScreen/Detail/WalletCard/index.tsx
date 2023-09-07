import type { FC } from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import type { CardSkin } from '@walless/app';
import { View } from '@walless/gui';
import type { MetadataDocument } from '@walless/store';
import { DetailTool } from 'features/dashboard/EditTool/internal';
import TargetWrapper from 'features/dashboard/EditTool/TargetWrapper';
import { appState } from 'state/tool';
import { useSnapshot } from 'valtio';

import WalletAddress from './Address';
import WalletBalance from './Balance';

interface Props {
	index?: number;
	width?: number;
	skin: CardSkin;
	token: MetadataDocument;
}

export const WalletCard: FC<Props> = ({ index = 0, skin, token }) => {
	const { tools } = useSnapshot(appState);

	return (
		<ImageBackground style={styles.container} source={skin.backgroundSrc}>
			<WalletAddress index={index} skin={skin} />
			<WalletBalance token={token} />
			<View style={styles.icon}>
				<TargetWrapper isTargeted={tools.target === DetailTool.icon}>
					<Image
						source={
							tools.detail.icon ? { uri: tools.detail.icon } : skin.iconSrc
						}
						style={styles.image}
					/>
				</TargetWrapper>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 155,
		padding: 18,
		borderRadius: 12,
		overflow: 'hidden',
		position: 'relative',
		gap: 10,
	},
	icon: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: -34,
		justifyContent: 'center',
		zIndex: -1,
	},
	image: {
		width: 130,
		height: 130,
	},
});
