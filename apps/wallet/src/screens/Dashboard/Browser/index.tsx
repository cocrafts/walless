import type { FC } from 'react';
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

export const BrowserScreen: FC = () => {
	const { uri } = useSnapshot(browserState);
	const insets = useSafeAreaInsets();
	const source = { uri };
	const { onLoadProgress, onLoadStart, onloadEnd } = useWebViewProgress();

	const containerStyle: ViewStyle = {
		flex: 1,
		paddingTop: insets.top,
	};

	const navigatorStyle: ViewStyle = {	
		paddingBottom: tabBarHeight + insets.bottom,
	};

	return (
		<TouchableWithoutFeedback onPress={hideNativeKeyboard}>
			<View style={containerStyle}>
				<WebView
					source={source}
					style={styles.webviewContainer}
					onLoadStart={onLoadStart as never}
					onLoadProgress={onLoadProgress as never}
					onLoadEnd={onloadEnd as never}
				/>
				<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-tabBarHeight}>
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
	},
	webviewContainer: {
		flex: 1,
	},
});
