import type { FC } from 'react';
import { Image, Stack, Text } from '@walless/ui';
import Anchor from 'components/Anchor';

import type { ExtensionConfig } from './shared';

interface Props {
	size?: number;
	item: ExtensionConfig;
	titleClass?: string;
}

export const ExtensionIcon: FC<Props> = ({ size = 48, item }) => {
	const opacity = item.disabled ? 0.3 : 1;
	const href = item.disabled ? '#' : item.download;

	return (
		<Anchor opacity={opacity} href={href} target="_blank">
			<Stack
				animation="fast"
				hoverStyle={{ opacity: 0.6 }}
				pressStyle={{ opacity: 0.4 }}
			>
				<Image
					style={[item.disabled && ({ filter: 'grayscale(100%)' } as never)]}
					src={item.iconSrc}
					alignSelf="center"
					defaultSource={item.iconSrc}
					width={size}
					height={size}
					resizeMode="contain"
					marginBottom={12}
				/>
				<Stack
					userSelect="none"
					width={62}
					borderRadius={100}
					alignItems="center"
					backgroundColor="rgba(255, 255, 255, 0.1)"
					paddingVertical={8}
				>
					<Text fontSize={12}>{item.title}</Text>
				</Stack>
			</Stack>
		</Anchor>
	);
};

export default ExtensionIcon;
