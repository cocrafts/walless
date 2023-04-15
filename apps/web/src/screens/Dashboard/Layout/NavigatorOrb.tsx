import { type FC, type ReactNode } from 'react';
import { type ExtensionConfig } from '@walless/core';
import { Image, Stack } from '@walless/gui';
import { router } from 'utils/routing';

export type OrbConfig = Partial<ExtensionConfig> & {
	route?: string;
	size?: number;
};

export interface Props {
	item: OrbConfig;
	children?: ReactNode;
	onPress?: () => void;
}

export const NavigatorOrb: FC<Props> = ({ item, children, onPress }) => {
	const { size = 40, color = '#243f56' } = item;

	const handlePress = () => {
		if (onPress) {
			onPress();
		} else if (item.route) {
			router.navigate(item.route);
		} else if (item.id) {
			router.navigate(`/${item.type}/${item.id}`);
		} else {
			router.navigate(`/${item.type}`);
		}
	};

	return (
		<Stack
			cursor="pointer"
			userSelect="none"
			alignItems="center"
			justifyContent="center"
			width={size}
			height={size}
			backgroundColor={color}
			borderRadius={12}
			hoverStyle={{ opacity: 0.8 }}
			pressStyle={{ opacity: 0.6 }}
			onPress={handlePress}
		>
			{children || <Image width={40} height={40} src={item.icon as never} />}
		</Stack>
	);
};

export default NavigatorOrb;
