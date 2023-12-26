import { useEffect, useRef } from 'react';
import { Networks } from '@walless/core';
import { appState } from '@walless/engine';
import { View } from '@walless/gui';
import { modules } from '@walless/ioc';

import {
	usePublicKeys,
	useResponsive,
	useSnapshot,
} from '../../../utils/hooks';

export const Pixeverse = () => {
	const { isMobileResponsive } = useResponsive();
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
				isMobile: isMobileResponsive,
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
	}, [pubkey, jwtAuth]);

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
