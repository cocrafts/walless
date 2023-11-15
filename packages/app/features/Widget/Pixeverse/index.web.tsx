import { useEffect, useRef } from 'react';
import { usePublicKeys, useSnapshot } from '@walless/app/utils/hooks';
import { Networks } from '@walless/core';
import { appState } from '@walless/engine';
import { View } from '@walless/gui';
import { modules } from '@walless/ioc';

export const Pixeverse = () => {
	const { PIXEVERSE_ENDPOINT, PIXEVERSE_ORIGIN, PIXEVERSE_URL } =
		modules.config;
	const { jwtAuth } = useSnapshot(appState);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [pubkey] = usePublicKeys(Networks.solana);

	useEffect(() => {
		const forwardContext = async () => {
			const payload = {
				apiUrl: PIXEVERSE_ENDPOINT,
				jwt: jwtAuth,
				address: pubkey._id,
			};

			iframeRef?.current?.contentWindow?.postMessage(payload, PIXEVERSE_ORIGIN);
		};

		const onPixeverseReady = async (event: MessageEvent) => {
			const fromTrustedOrigin = event.origin === PIXEVERSE_ORIGIN;
			const fromReadyEvent = event.data === 'on-pixeverse-ready';

			if (fromTrustedOrigin && fromReadyEvent) {
				forwardContext();
			}
		};

		window.addEventListener('message', onPixeverseReady);
		iframeRef.current?.focus();

		return () => {
			window.removeEventListener('message', onPixeverseReady);
		};
	}, [pubkey, jwtAuth]);

	return (
		<View style={{ width: 352, height: 600, justifyContent: 'center' }}>
			<iframe
				ref={iframeRef}
				allow="web-share"
				src={PIXEVERSE_URL}
				width={352}
				height={600}
				style={{ borderColor: 'transparent' }}
				autoFocus
			/>
		</View>
	);
};

export default Pixeverse;
