export const configurePWA = () => {
	self.addEventListener('install', onInstall);
	self.addEventListener('activate', onActivate);
};

const onInstall = () => {
	console.log('service worker installed');
};

const onActivate = () => {
	console.log('service worker activated');
};
