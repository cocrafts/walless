export const boostrapMessaging = () => {
	global.postMessage({ from: 'walless-content-script-loaded' });

	global.addEventListener(
		'message',
		async ({ source, data }) => {
			if (source !== window) return;

			if (data.from?.startsWith('walless@')) {
				await chrome.runtime.sendMessage(data);
			}
		},
		false,
	);
};
