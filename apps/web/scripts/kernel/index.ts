import { initializeMessaging } from './messaging';

(async () => {
	await Promise.all([initializeMessaging()]);
})();

export * from './messaging';
export * from './storage';
