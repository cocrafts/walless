import type { FC } from 'react';
import { Image } from 'react-native';
import type { CardSkin } from '@walless/app';
import { View } from '@walless/gui';
import type { MetadataDocument } from '@walless/store';
import TargetWrapper from 'features/dashboard/EditTool/TargetWrapper';

import WalletAddress from './Address';
import WalletBalance from './Balance';

interface Props {
	index?: number;
	width?: number;
	skin: CardSkin;
	token: MetadataDocument;
}

export const WalletCard: FC<Props> = ({
	index = 0,
	width = 340,
	skin,
	token,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const height = (width * 145) / 318;
	const markImgSize = 130;

	return (
		<View>
			<WalletAddress index={index} skin={skin} />
			<WalletBalance token={token} />
			<View>
				<TargetWrapper isTargeted={true}>
					<Image
						source={skin.iconSrc}
						style={{
							width: markImgSize,
							height: markImgSize,
						}}
					/>
				</TargetWrapper>
			</View>
		</View>
	);
};
