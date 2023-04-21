import {
	type FC,
	type HTMLAttributeAnchorTarget,
	type ReactNode,
	useRef,
} from 'react';
import {
	type TextStyle,
	type ViewStyle,
	Linking,
	StyleSheet,
} from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { isBrowser } from '../utils/platform';

import { AnimatedPressable } from './aliased';
import Text from './Text';

interface MouseContext {
	mouseIn?: boolean;
}

interface Props {
	hoverOpacity?: number;
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
	href,
	target = '_blank',
	onPress,
	children,
	style,
	title,
	titleStyle,
}) => {
	const mouseContextRef = useRef<MouseContext>({});
	const isHrefValid = (href?.length as number) > 0;
	const opacity = useSharedValue(1);
	const containerStyle = useAnimatedStyle(
		() => ({
			opacity: opacity.value,
		}),
		[opacity],
	);

	const handleHoverIn = () => {
		opacity.value = withTiming(hoverOpacity, { duration: 50 });
		mouseContextRef.current.mouseIn = true;
	};

	const handleHoverOut = () => {
		opacity.value = withTiming(1, { duration: 50 });
		mouseContextRef.current.mouseIn = false;
	};

	const handlePressIn = () => {
		opacity.value = withTiming(0.4, { duration: 50 });
	};

	const handlePressOut = () => {
		const nextOpacity = mouseContextRef.current.mouseIn ? hoverOpacity : 1;
		opacity.value = withTiming(nextOpacity, { duration: 50 });
	};

	const handlePress = async () => {
		onPress?.();

		if (!isBrowser && isHrefValid) {
			await Linking.openURL(href as string);
		}
	};

	const innerElement = children || <Text style={titleStyle}>{title}</Text>;

	return (
		<AnimatedPressable
			style={[styles.container, containerStyle, style]}
			onHoverIn={handleHoverIn}
			onHoverOut={handleHoverOut}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={handlePress}
		>
			{isBrowser ? (
				<a href={href} target={target}>
					{innerElement}
				</a>
			) : (
				innerElement
			)}
		</AnimatedPressable>
	);
};

export default Anchor;

const styles = StyleSheet.create({
	container: {},
});
