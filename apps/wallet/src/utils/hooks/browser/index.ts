import type { RefObject } from 'react';
import { useState } from 'react';
import type { NativeSyntheticEvent } from 'react-native';
import { MainBundlePath, readFile } from 'react-native-fs';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import type WebView from 'react-native-webview';
import type { WebViewMessageEvent } from 'react-native-webview';
import { logger } from '@walless/core';
import { colors } from 'utils/style';

interface ProgressEvent {
	progress: number;
}

interface LoadEvent {
	title: string;
	url: string;
	target: number;
	loading: boolean;
	canGoBack: boolean;
	canGoForward: boolean;
	navigationType:
		| 'click'
		| 'formsubmit'
		| 'backforward'
		| 'reload'
		| 'formresubmit'
		| 'other';
}

export const useWebViewProgress = (ref: RefObject<WebView>) => {
	const backgroundColor = useSharedValue(colors.tabNavigatorBg);
	const [loading, setLoading] = useState<boolean>(false);
	const progress = useSharedValue<number>(0);

	return {
		loading,
		progress,
		backgroundColor,
		onLoadStart: ({ nativeEvent }: NativeSyntheticEvent<LoadEvent>) => {
			setLoading(nativeEvent.loading);
		},
		onLoadProgress: ({ nativeEvent }: NativeSyntheticEvent<ProgressEvent>) => {
			progress.value = withTiming(nativeEvent.progress, { duration: 100 });
		},
		onloadEnd: async ({ nativeEvent }: NativeSyntheticEvent<LoadEvent>) => {
			setLoading(nativeEvent.loading);

			if (!nativeEvent.loading) {
				const injection = await readFile(`${MainBundlePath}/injection.js`);
				ref.current?.injectJavaScript(injection);
				ref.current?.injectJavaScript(reporter);
			}
		},
		onMessage: ({ nativeEvent }: WebViewMessageEvent) => {
			try {
				const payload = JSON.parse(nativeEvent.data);

				if (payload.type === 'page-info') {
					backgroundColor.value = payload.themeColor;
				}
			} catch (error) {
				logger.error('Failed to parse payload from embedded Browser message');
			}
		},
	};
};

const reporter = `
var bodyBackgroundColor = window.getComputedStyle(document.body).backgroundColor;
var metaThemeColor = document.querySelector('meta[name="theme-color"]');
var themeColor = metaThemeColor ? metaThemeColor.getAttribute('content') : null;
var payload = JSON.stringify({
  type: 'page-info',
  themeColor: themeColor || bodyBackgroundColor,
});

window.ReactNativeWebView.postMessage(payload);`;
