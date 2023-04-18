import { type FC, type ReactNode } from 'react';
import { type ExtensionRecord } from '@walless/storage';
import { Image, Stack } from '@walless/ui';
import { router } from 'utils/routing';

export type OrbConfig = Partial<ExtensionRecord> & {
	route?: string;
};

export interface Props {
	size?: number;
	item: OrbConfig;
	isActive?: boolean;
	children?: ReactNode;
	onPress?: () => void;
}

export const NavigatorOrb: FC<Props> = ({
	size = 40,
	item,
	isActive,
	children,
	onPress,
}) => {
	const { route, networkMeta } = item;
	const iconSrc = { uri: networkMeta?.iconUri as string };

	const handlePress = () => {
		if (onPress) {
			onPress();
		} else if (route) {
			router.navigate(route);
		} else {
			router.navigate(`/${item.id}`);
		}
	};

	return (
		<Stack alignItems="center">
			{isActive && (
				<Stack
					position="absolute"
					top={5}
					left={0}
					width={4}
					height={size - 10}
					borderTopRightRadius={3}
					borderBottomRightRadius={3}
					backgroundColor="white"
				/>
			)}
			<Stack
				cursor="pointer"
				userSelect="none"
				alignItems="center"
				justifyContent="center"
				width={size}
				height={size}
				backgroundColor={networkMeta?.iconColor as string}
				borderRadius={isActive ? 12 : size / 2}
				overflow="hidden"
				hoverStyle={{ opacity: 0.8 }}
				pressStyle={{ opacity: 0.6 }}
				onPress={handlePress}
			>
				{children || <Image width={40} height={40} src={iconSrc} />}
			</Stack>
		</Stack>
	);
};

export default NavigatorOrb;
