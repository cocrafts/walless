import { type FC, type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedRef,
	useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tabBarHeight } from '../../utils';

import StackHeader from './Header';

interface Props {
	title: string;
	style?: StyleProp<ViewStyle>;
	noHeader?: boolean;
	noBottomTabs?: boolean;
	children: ReactNode;
}

export const StackContainer: FC<Props> = ({
	title,
	style,
	noBottomTabs,
	children,
}) => {
	const insets = useSafeAreaInsets();
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const scrollContentContainerStyle: ViewStyle = {
		paddingBottom: noBottomTabs ? 0 : tabBarHeight,
	};

	return (
		<View style={[styles.container, style]}>
			<StackHeader title={title} insets={insets} scrollOffset={scrollOffset} />
			<Animated.ScrollView
				ref={scrollRef}
				scrollEventThrottle={12}
				contentContainerStyle={scrollContentContainerStyle}
			>
				{children}
			</Animated.ScrollView>
		</View>
	);
};

export default StackContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	noScrollContainer: {
		flex: 1,
	},
});

export type WithStackContainerOptions = Omit<Props, 'children'>;

export const withStackContainer = <T extends object>(
	ScreenComponent: FC<T>,
	options: WithStackContainerOptions,
) => {
	const WrappedComponent: FC<T> = (props) => (
		<StackContainer {...options}>
			<ScreenComponent {...props} />
		</StackContainer>
	);

	return WrappedComponent;
};

export * from './Header';
