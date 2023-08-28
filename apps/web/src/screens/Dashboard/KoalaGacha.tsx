import { useEffect, useRef } from 'react';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { auth } from 'utils/firebase';
import { usePublicKeys } from 'utils/hooks';

export const KoalaGacha = () => {
	const trustedOrigin = 'http://localhost:8080';
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [pubkey] = usePublicKeys(Networks.solana);

	useEffect(() => {
		const forwardContext = async () => {
			const payload = {
				apiUrl: __DEV__
					? 'https://nerve-stg.walless.io/pixeverse'
					: 'https://nerve.walless.io/pixeverse',
				jwt: await auth.currentUser?.getIdToken(true),
				address: pubkey._id,
			};

			iframeRef?.current?.contentWindow?.postMessage(payload, trustedOrigin);
		};

		const onPixeverseReady = async (event: MessageEvent) => {
			const fromTrustedOrigin = event.origin === trustedOrigin;
			const fromReadyEvent = event.data === 'on-pixeverse-ready';

			if (fromTrustedOrigin && fromReadyEvent) {
				forwardContext();
			}
		};

		const cancelIdTokenSubscription = auth.onIdTokenChanged(forwardContext);
		window.addEventListener('message', onPixeverseReady);

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
				src="http://localhost:8080/"
				width={352}
				height={600}
				style={{ borderColor: 'transparent' }}
				autoFocus
			/>
		</View>
	);
};
