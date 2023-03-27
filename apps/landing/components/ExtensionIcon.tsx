import { FC } from 'react';
import { Stack, Text } from '@walless/wui';
import { Image } from 'tamagui';

interface Props {
	iconSrc: string;
	title: string;
	onPress?: () => void;
	titleClass?: string;
}

export const ExtensionIcon: FC<Props> = ({ iconSrc, title, onPress }) => {
	return (
		<Stack
			alignItems="center"
			cursor="pointer"
			marginTop={52}
			marginHorizontal={32}
			animation="fast"
			hoverStyle={{ scale: 0.95 }}
			pressStyle={{ opacity: 0.7 }}
			onPress={onPress}
		>
			<Image
				src={iconSrc}
				defaultSource={{ uri: iconSrc }}
				width={iconSize}
				height={iconSize}
				resizeMode="contain"
				marginBottom={18}
			/>
			<Text
				fontSize={14}
				fontWeight="300"
				textAlign="center"
				borderRadius={100}
				backgroundColor="rgba(255, 255, 255, 0.1)"
				paddingVertical={8}
				paddingHorizontal={18}
			>
				{title}
			</Text>
		</Stack>
	);
};

export default ExtensionIcon;

const iconSize = 80;
