import { useEffect, useRef } from 'react';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { auth } from 'utils/firebase';
import { usePublicKeys } from 'utils/hooks';

export const KoalaGacha = () => {
	const trustedOrigin = 'http://localhost:8080';
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [pubkey] = usePublicKeys(Networks.solana);

	window.addEventListener('message', async (event) => {
		if (event.origin === trustedOrigin) {
			if (event.data === 'done') {
				const jwt = await auth.currentUser?.getIdToken(true);
				iframeRef?.current?.contentWindow?.postMessage(
					{
						jwt,
						pubkey: pubkey._id,
					},
					trustedOrigin,
				);
			}
		}
	});

	useEffect(() => {
		const subscription = auth.onIdTokenChanged(async (user) => {
			iframeRef?.current?.contentWindow?.postMessage(
				{
					jwt: await user?.getIdToken(),
					pubkey: pubkey._id,
				},
				trustedOrigin,
			);
		});

		return () => {
			subscription();
		};
	}, []);

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
