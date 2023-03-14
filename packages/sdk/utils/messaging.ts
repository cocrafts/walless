export const requestConnect = (options: { onlyIfTrusted?: boolean }) => {
	global.postMessage({ from: 'walless@request-connect', options });
};
