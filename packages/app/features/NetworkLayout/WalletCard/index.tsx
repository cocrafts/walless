import { type FC, useState } from 'react';
import { type StackProps, Image, ImageBackground, Stack } from '@walless/gui';
import { TokenRecord } from '@walless/storage';

import WalletAddress from './Address';
import WalletBalance from './Balance';
import { CardSkin } from './shared';

type Props = StackProps & {
	index?: number;
	skin: CardSkin;
	token: TokenRecord;
};

export const WalletCard: FC<Props> = ({ index = 0, skin, token }) => {
	const [isPrivate, setIsPrivate] = useState(false);

	const handleHide = (next: boolean) => {
		setIsPrivate(next);
	};

	return (
		<ImageBackground
			source={skin.backgroundSrc}
			aspectRatio={318 / 145}
			borderRadius={12}
			paddingHorizontal={18}
			justifyContent="center"
			overflow="hidden"
		>
			<WalletAddress index={index} skin={skin} token={token} />
			<WalletBalance token={token} isPrivate={isPrivate} onHide={handleHide} />
			<Stack
				position="absolute"
				top={0}
				right={-34}
				bottom={0}
				justifyContent="center"
			>
				<Image src={skin.largeIconSrc} width={130} height={130} />
			</Stack>
		</ImageBackground>
	);
};

export default WalletCard;

export * from './shared';
