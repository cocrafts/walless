import { ExtensionMessageTarget, Serializer } from '@airgap/beacon-sdk';

import { messenger } from './messaging';

const WALLESS_TEZOS = {
	id: chrome.runtime.id,
	name: 'Walless',
	iconUrl: 'https://walless.io/img/walless-icon.svg',
};

window.addEventListener('message', async (e) => {
	console.log('on message', e.data);
	if (
		e.data?.target !== ExtensionMessageTarget.EXTENSION ||
		(e.data?.targetId && e.data?.targetId !== WALLESS_TEZOS.id)
	) {
		return;
	}

	if (e.data?.payload === 'ping') {
		window.postMessage({
			target: ExtensionMessageTarget.PAGE,
			payload: 'pong',
			sender: WALLESS_TEZOS,
		} as never);
	} else {
		let payload;
		const rawPayload = e.data?.payload;
		if (typeof rawPayload === 'string') {
			payload = await new Serializer().deserialize(rawPayload);
		}

		const res = await messenger.request('kernel', {
			from: 'walless@sdk',
			payload,
		});

		window.postMessage(res);
	}
});
