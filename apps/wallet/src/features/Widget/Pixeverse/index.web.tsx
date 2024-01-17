import { useEffect, useRef } from 'react';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { usePublicKeys, useSnapshot } from 'hooks';
import { appState } from 'state/app';
import { environment } from 'utils/config';

export const Pixeverse = () => {
	const { PIXEVERSE_ENDPOINT, PIXEVERSE_ORIGIN, PIXEVERSE_URL } = environment;
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
