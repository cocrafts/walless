import { type FC, type HTMLAttributeAnchorTarget, type ReactNode } from 'react';
import { type TextStyle, type ViewStyle, Linking } from 'react-native';

import { isBrowser } from '../utils/platform';

import Hoverable from './Hoverable';
import Text from './Text';

interface Props {
	hoverOpacity?: number;
	animationDuration?: number;
	href?: string;
	target?: HTMLAttributeAnchorTarget;
	onPress?: () => void;
	children?: ReactNode;
	style?: ViewStyle;
	title?: string;
	titleStyle?: TextStyle;
}

export const Anchor: FC<Props> = ({
	hoverOpacity = 0.6,
	animationDuration,
	href,
	target = '_blank',
	onPress,
	children,
	title,
	titleStyle,
}) => {
	const isHrefValid = (href?.length as number) > 0;

	const handlePress = async () => {
		onPress?.();

		if (!isBrowser && isHrefValid) {
			await Linking.openURL(href as string);
		}
	};

	const innerElement = children || <Text style={titleStyle}>{title}</Text>;

	return (
		<Hoverable
			hoverOpacity={hoverOpacity}
			animationDuration={animationDuration}
			onPress={handlePress}
		>
			{isBrowser ? (
				<a href={href} target={target}>
					{innerElement}
				</a>
			) : (
				innerElement
			)}
		</Hoverable>
	);
};

export default Anchor;
