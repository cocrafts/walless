import { useEffect, useRef, useState } from 'react';
import type { WebViewMessageEvent } from 'react-native-webview';
import { WebView } from 'react-native-webview';
import { Networks } from '@walless/core';
import { appState } from 'state/app';
import { environment } from 'utils/config';
import { usePublicKeys, useSnapshot } from 'utils/hooks';

export const Pixeverse = () => {
	const { jwtAuth, isMobileDisplay } = useSnapshot(appState);
	const [isReady, setIsReady] = useState(false);
	const { PIXEVERSE_ENDPOINT, PIXEVERSE_ORIGIN, PIXEVERSE_URL } = environment;
	const webviewRef = useRef<WebView>();
	const [pubkey] = usePublicKeys(Networks.solana);

	const onMessage = (event: WebViewMessageEvent) => {
		const { data, url } = event.nativeEvent;

		const fromTrustedOrigin = url.includes(PIXEVERSE_ORIGIN);
		const fromReadyEvent = data === 'on-pixeverse-ready';

		setIsReady(fromTrustedOrigin && fromReadyEvent);
	};

	useEffect(() => {
		const forwardContext = async () => {
			const payload = {
				apiUrl: PIXEVERSE_ENDPOINT,
				jwt: jwtAuth,
				address: pubkey._id,
				isMobile: isMobileDisplay,
			};

			webviewRef.current?.injectJavaScript(
				`window.postMessage(${JSON.stringify(
					JSON.stringify(payload),
				)}, window.origin);
                true;`,
			);
		};

		isReady && forwardContext();
	}, [pubkey, jwtAuth, isReady]);

	return (
		<WebView
			ref={webviewRef as never}
			source={{ uri: PIXEVERSE_URL }}
			style={{ flex: 1 }}
			onMessage={onMessage}
			webviewDebuggingEnabled
		/>
	);
};

export default Pixeverse;
