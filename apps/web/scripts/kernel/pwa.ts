import { logger } from '@walless/core';

export const configurePWA = () => {
	self.addEventListener('install', onInstall);
	self.addEventListener('activate', onActivate);
	self.addEventListener('fetch', onFetchRequest);
};

const onInstall = () => {
	logger.info('Service worker installed');
};

const onActivate = () => {
	logger.info('Service worker activated');
};

/* eslint-disable-next-line */
const onFetchRequest = (event: any) => {
	const networkFirstFetch = fetch(event.request).catch(function () {
		return caches.match(event.request);
	});

	event.respondWith(networkFirstFetch);
};
