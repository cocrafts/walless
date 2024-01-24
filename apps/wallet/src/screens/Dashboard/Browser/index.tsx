import type { FC } from 'react';
import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import {
	KeyboardAvoidingView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { browserState } from 'state/browser';
import { tabBarHeight } from 'utils/constants';
import {
	useSafeAreaInsets,
	useSnapshot,
	useWebViewProgress,
} from 'utils/hooks';
import { hideNativeKeyboard } from 'utils/system';

import Navigator from './Navigator';
import { colors } from 'utils/style';

export const BrowserScreen: FC = () => {
	const { uri } = useSnapshot(browserState);
	const insets = useSafeAreaInsets();
	const source = { uri };
	const { onLoadProgress, onLoadStart, onloadEnd } = useWebViewProgress();

	const accumulateTabHeight = useMemo(() => {
		return tabBarHeight + insets.bottom;
	}, [insets.bottom]);

	const containerStyle: ViewStyle = {
		flex: 1,
		paddingTop: insets.top,
	};

	const navigatorStyle: ViewStyle = {	
		paddingBottom: accumulateTabHeight, 
	};

	return (
		<TouchableWithoutFeedback onPress={hideNativeKeyboard}>
			<View style={containerStyle}>
				<WebView
					forceDarkOn
					source={source}
					style={styles.webviewContainer}
					onLoadStart={onLoadStart as never}
					onLoadProgress={onLoadProgress as never}
					onLoadEnd={onloadEnd as never}
				/>
				<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-accumulateTabHeight}>
					<Navigator style={navigatorStyle}/>
				</KeyboardAvoidingView>
			</View>
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
	},
});
