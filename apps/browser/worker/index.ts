/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

const readBlob = (blob): Promise<string | ArrayBuffer> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsText(blob);
	});
};

self.addEventListener('fetch', async (event) => {
	const url = new URL(event.request.url);
	const isValidUri = url.pathname.startsWith('/w3a-response');
	const isValidScope = url.href.includes(self.registration.scope);

	if (isValidUri && isValidScope) {
		const blob = await fetch('/w3a-response.html');
		const pageMarkup = await readBlob(blob);

		event.respondWith(new Response(pageMarkup));
	}
});
