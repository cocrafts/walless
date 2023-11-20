import { useEffect, useRef, useState } from 'react';
import type { WebViewMessageEvent } from 'react-native-webview';
import { WebView } from 'react-native-webview';
import { Networks } from '@walless/core';
import { appState } from '@walless/engine';
import { modules } from '@walless/ioc';

import { usePublicKeys, useSnapshot } from '../../../utils/hooks';

export const Pixeverse = () => {
	const { jwtAuth } = useSnapshot(appState);
	const [isReady, setIsReady] = useState(false);
	const { PIXEVERSE_ENDPOINT, PIXEVERSE_ORIGIN, PIXEVERSE_URL } =
		modules.config;
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
			ref={webviewRef}
			source={{ uri: PIXEVERSE_URL }}
			style={{ flex: 1 }}
			onMessage={onMessage}
			webviewDebuggingEnabled
		/>
	);
};

export default Pixeverse;
