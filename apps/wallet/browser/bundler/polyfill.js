global.chrome.runtime = Object.assign(global.chrome.runtime || {}, {
	id: 'internal-walless-app',
});

export * from 'browser/content/utils';
export const injectScript = () => {
	require('browser/content/injection');
};
