import type { FC, HTMLAttributeAnchorTarget, ReactNode } from 'react';
import type { PressableProps, TextStyle, ViewStyle } from 'react-native';
import { Linking } from 'react-native';

import { isBrowser } from '../utils/platform';
import { iStyles } from '../utils/style';

import Hoverable from './Hoverable';
import Text from './Text';

type Props = PressableProps & {
	style?: ViewStyle;
	hoverOpacity?: number;
	animationDuration?: number;
	href?: string;
	target?: HTMLAttributeAnchorTarget;
	onPress?: () => void;
	children?: ReactNode;
	title?: string;
	titleStyle?: TextStyle;
};

export const Anchor: FC<Props> = ({
	style,
	hoverOpacity = 0.6,
	animationDuration,
	href,
	target = '_blank',
	onPress,
	children,
	title,
	titleStyle,
	...presableProps
}) => {
	const isHrefValid = (href?.length as number) > 0;

	const handlePress = async () => {
		onPress?.();

		if (!isBrowser && isHrefValid) {
			await Linking.openURL(href as string);
		}
	};

	const innerElement = children || (
		<Text style={[iStyles.link, titleStyle]}>{title}</Text>
	);

	return (
		<Hoverable
			style={style}
			hoverOpacity={hoverOpacity}
			animationDuration={animationDuration}
			onPress={handlePress}
			{...presableProps}
		>
			{isBrowser ? (
				<a style={linkStyle} href={href} target={target}>
					{innerElement}
				</a>
			) : (
				innerElement
			)}
		</Hoverable>
	);
};

export default Anchor;

const linkStyle = {
	display: 'contents',
};
