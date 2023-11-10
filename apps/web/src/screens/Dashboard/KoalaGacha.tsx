import { useEffect, useRef } from 'react';
import { usePublicKeys } from '@walless/app/utils/hooks';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { auth } from 'utils/firebase';

export const KoalaGacha = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [pubkey] = usePublicKeys(Networks.solana);

	useEffect(() => {
		const forwardContext = async () => {
			const payload = {
				apiUrl: PIXEVERSE_ENDPOINT,
				jwt: await auth.currentUser?.getIdToken(true),
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

		const cancelIdTokenSubscription = auth.onIdTokenChanged(forwardContext);
		window.addEventListener('message', onPixeverseReady);
		iframeRef.current?.focus();

		return () => {
			cancelIdTokenSubscription();
			window.removeEventListener('message', onPixeverseReady);
		};
	}, [pubkey]);

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
