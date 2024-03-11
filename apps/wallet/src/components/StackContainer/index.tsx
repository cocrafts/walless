import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedRef,
	useScrollViewOffset,
} from 'react-native-reanimated';
import { tabBarHeight } from 'utils/constants';
import { useUniversalInsets } from 'utils/hooks';

import StackHeader from './Header';

interface Props {
	title?: string;
	style?: StyleProp<ViewStyle>;
	isHeaderActive?: boolean;
	noBottomTabs?: boolean;
	toggleDrawer?: () => void;
	goBack?: () => void;
	scrollEnabled?: boolean;
	children: ReactNode;
}

export const StackContainer: FC<Props> = ({
	title = '',
	style,
	isHeaderActive = true,
	noBottomTabs,
	toggleDrawer,
	goBack,
	children,
	scrollEnabled = true,
}) => {
	const insets = useUniversalInsets();
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const scrollContentContainerStyle: ViewStyle = {
		paddingBottom: noBottomTabs ? 0 : tabBarHeight,
		flex: scrollEnabled ? 0 : 1,
	};

	return (
		<View style={[styles.container, style]}>
			{isHeaderActive && (
				<StackHeader
					title={title}
					insets={insets}
					scrollOffset={scrollOffset}
					onToggleDrawer={toggleDrawer}
					onGoBack={goBack}
				/>
			)}
			<Animated.ScrollView
				ref={scrollRef}
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={12}
				contentContainerStyle={scrollContentContainerStyle}
				scrollEnabled={scrollEnabled}
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
