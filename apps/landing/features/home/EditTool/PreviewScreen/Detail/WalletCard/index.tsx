import { type FC } from 'react';
import { type CardSkin } from '@walless/app';
import { type MetadataDocument } from '@walless/store';
import { Image, ImageBackground, Stack } from '@walless/ui';
import { DetailTool } from 'features/home/EditTool/internal';
import TargetWrapper from 'features/home/EditTool/TargetWrapper';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

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
	width = 312,
	skin,
	token,
}) => {
	const height = (width * 145) / 318;
	const markImgSize = 130;
	const { tools } = useSnapshot(appState);
	const { icon } = tools.detail;

	return (
		<ImageBackground
			source={skin.backgroundSrc}
			width={width}
			height={height}
			aspectRatio={318 / 145}
			borderRadius={12}
			padding={18}
			justifyContent="center"
			overflow="hidden"
			zIndex={9}
			position="relative"
			marginRight={15}
		>
			<WalletAddress index={index} skin={skin} />
			<WalletBalance token={token} />
			<Stack
				position="absolute"
				top={0}
				bottom={0}
				right={-34}
				justifyContent="center"
				zIndex={-1}
			>
				<TargetWrapper isTargeted={tools.target === DetailTool.icon}>
					<Image
						src={{ uri: icon } || skin.iconSrc}
						width={markImgSize}
						height={markImgSize}
					/>
				</TargetWrapper>
			</Stack>
		</ImageBackground>
	);
};
