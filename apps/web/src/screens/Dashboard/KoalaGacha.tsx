import { useEffect, useRef } from 'react';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { auth } from 'utils/firebase';
import { usePublicKeys } from 'utils/hooks';

export const KoalaGacha = () => {
	const useLocalBuild = false;
	const trustedOrigin = useLocalBuild
		? 'http://localhost:8080'
		: 'https://cdn.stormgate.io';
	const gameUrl = useLocalBuild
		? 'http://localhost:8080'
		: 'https://cdn.stormgate.io/pixeverse/index.html';
	const apiUrl = useLocalBuild
		? 'https://nerve-stg.walless.io/pixeverse'
		: 'https://nerve.walless.io/pixeverse';
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [pubkey] = usePublicKeys(Networks.solana);

	useEffect(() => {
		const forwardContext = async () => {
			const payload = {
				apiUrl,
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
				src={gameUrl}
				width={352}
				height={600}
				style={{ borderColor: 'transparent' }}
				autoFocus
			/>
		</View>
	);
};
