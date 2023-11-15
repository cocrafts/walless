export const configurePWA = () => {
	self.addEventListener('install', onInstall);
	self.addEventListener('activate', onActivate);
	self.addEventListener('fetch', onFetch);
};

const onInstall = () => {
	console.log('service worker installed');
};

const onActivate = () => {
	console.log('service worker activated');
};

const onFetch = (event: Event) => {
	console.log(event);
};
