import { logger } from '@walless/core';

export const configurePWA = () => {
	self.addEventListener('install', onInstall);
	self.addEventListener('activate', onActivate);
	// TODO: need to resolve this one for pwa
	// self.addEventListener('fetch', onFetch);
};

const onInstall = () => {
	logger.info('Service worker installed');
};

const onActivate = () => {
	logger.info('Service worker activated');
};

// TODO: need to optimize later
/* eslint-disable-next-line */
const onFetch = async (event: any) => {
	try {
		return await fetch(event.request);
	} catch {
		return caches.match(event.request);
	}
};
