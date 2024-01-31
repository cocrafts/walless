import type { FC } from 'react';
import { useMemo, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import {
	KeyboardAvoidingView,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { WebView } from 'react-native-webview';
import { browserActions, browserState } from 'state/browser';
import { tabBarHeight } from 'utils/constants';
import {
	useSafeAreaInsets,
	useSnapshot,
	useWebViewProgress,
} from 'utils/hooks';
import { colors } from 'utils/style';
import { hideNativeKeyboard } from 'utils/system';

import Navigator from './Navigator';

export const BrowserScreen: FC = () => {
	const { url: uri } = useSnapshot(browserState);
	const webviewRef = useRef<WebView>();
	const insets = useSafeAreaInsets();
	const source = { uri };
	const scrollOffset = useSharedValue<number>(0);
	const {
		backgroundColor,
		progress,
		onLoadProgress,
		onLoadStart,
		onloadEnd,
		onMessage,
	} = useWebViewProgress(webviewRef as never);

	const accumulateTabHeight = useMemo(() => {
		return tabBarHeight + insets.bottom;
	}, [insets.bottom]);

	const containerStyle: ViewStyle = useAnimatedStyle(() => {
		return {
			flex: 1,
			backgroundColor: backgroundColor.value,
			paddingTop: insets.top,
		};
	}, [backgroundColor]);

	const navigatorStyle: ViewStyle = {
		paddingBottom: accumulateTabHeight,
	};

	/* eslint-disable-next-line */
  const onWebViewScroll = ({ nativeEvent: { contentOffset } }: any) => {
		scrollOffset.value = contentOffset.y;
	};

	const handleBrowserGo = (url: string) => {
		browserActions.setUrl(url);
		console.log(url);
	};

	return (
		<TouchableWithoutFeedback onPress={hideNativeKeyboard}>
			<Animated.View style={containerStyle}>
				<WebView
					forceDarkOn
					webviewDebuggingEnabled
					useWebView2={false}
					ref={(ref) => (webviewRef.current = ref as never)}
					source={source}
					style={styles.webviewContainer}
					onScroll={onWebViewScroll}
					onMessage={onMessage as never}
					onLoadStart={onLoadStart as never}
					onLoadProgress={onLoadProgress as never}
					onLoadEnd={onloadEnd as never}
				/>
				<KeyboardAvoidingView
					behavior="position"
					keyboardVerticalOffset={-accumulateTabHeight}
				>
					<Navigator
						style={navigatorStyle}
						progress={progress}
						onGo={handleBrowserGo}
					/>
				</KeyboardAvoidingView>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default BrowserScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.tabNavigatorBg,
	},
	webviewContainer: {
		flex: 1,
		backgroundColor: 'transparent',
	},
});
