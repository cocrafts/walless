import { useEffect, useRef } from 'react';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { appState } from 'state/app';
import { environment } from 'utils/config';
import { usePublicKeys, useSnapshot } from 'utils/hooks';

export const Pixeverse = () => {
	const { PIXEVERSE_ENDPOINT, PIXEVERSE_ORIGIN, PIXEVERSE_URL } = environment;
	const { jwtAuth, isMobileDisplay } = useSnapshot(appState);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const pubKeys = usePublicKeys();

	useEffect(() => {
		const forwardContext = async () => {
			const payload = {
				apiUrl: PIXEVERSE_ENDPOINT,
				jwt: jwtAuth,
				address: pubKeys.find((key) => key.network === Networks.solana)?._id,
				suiAddress: pubKeys.find((key) => key.network === Networks.sui)?._id,
				isMobile: isMobileDisplay,
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

		return () => {
			window.removeEventListener('message', onPixeverseReady);
		};
	}, [pubKeys, jwtAuth]);

	const handleOnLoad = () => {
		iframeRef.current?.contentWindow?.focus();
	};

	return (
		<View style={{ width: 352, height: 600, justifyContent: 'center' }}>
			<iframe
				ref={iframeRef}
				allow="web-share"
				src={PIXEVERSE_URL}
				width={352}
				height={600}
				style={{ borderColor: 'transparent' }}
				onLoad={handleOnLoad}
				autoFocus
			/>
		</View>
	);
};

export default Pixeverse;
