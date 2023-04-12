let isExtensionAvailable = false;

export const parseAndNotifyResult = async () => {
	let error = '';
	let instanceParams: Record<string, string> = {};
	const url = new URL(window.location.href);
	const hash = url.hash.substring(1);
	const queryParams: Record<string, string> = {};
	const hashParams: Record<string, string> = {};

	url.searchParams.forEach((value, key) => {
		queryParams[key] = value;
	});

	if (hash) {
		hash.split('&').forEach((param) => {
			const [key, value] = param.split('=');
			hashParams[key] = value;
		});
	}

	try {
		if (Object.keys(hashParams).length > 0 && hashParams.state) {
			instanceParams =
				JSON.parse(
					window.atob(decodeURIComponent(decodeURIComponent(hashParams.state))),
				) || {};

			if (hashParams.error) error = hashParams.error;
		} else if (Object.keys(queryParams).length > 0 && queryParams.state) {
			instanceParams =
				JSON.parse(
					window.atob(
						decodeURIComponent(decodeURIComponent(queryParams.state)),
					),
				) || {};

			if (queryParams.error) error = queryParams.error;
		}
	} catch (e) {
		console.error(e);
	}

	const channel = `redirect_channel_${instanceParams.instanceId}`;
	const data = { queryParams, instanceParams, hashParams };

	if (instanceParams.redirectToOpener) {
		/* Tab opened by Firefox Extension will not pass window.opener, because strict cross-origin policy
		 * broadcast the result to it-self, which listened/handle by Extension */
		const payload = {
			from: 'walless@sdk',
			type: 'sign-in-response',
			channel,
			data,
			error,
		};

		if (window.opener?.postMessage) {
			window.opener?.postMessage(payload, '*');
		} else {
			window.postMessage(payload);
		}
	}
};

const waitForContentScript = (): Promise<void> => {
	return new Promise((resolve) => {
		window.addEventListener('message', (event) => {
			if (event.data.from === 'walless-content-script-loaded') {
				isExtensionAvailable = true;
				resolve();
			}
		});
	});
};

const waitForTimeout = (): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 500);
	});
};

Promise.race([waitForContentScript(), waitForTimeout()]).then(() => {
	parseAndNotifyResult();
});
