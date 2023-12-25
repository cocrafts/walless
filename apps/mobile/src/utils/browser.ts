import { handleUniversalLinkingRequest } from './navigation';

export const configureBrowserRuntime = () => {
	pwaStandaloneHack();
	configureInitialURL();
};

const configureInitialURL = () => {
	const { pathname, hash } = new URL(window.location.href);

	if (pathname !== '/' || hash !== '') {
		handleUniversalLinkingRequest(window.location.href);
	}

	setTimeout(() => {
		window.history.pushState('home', 'Walless', '/splash');
	}, 0);
};

const pwaStandaloneHack = () => {
	/* eslint-disable-next-line */
	if ((navigator as any).standalone) {
		document.addEventListener('scroll', () => {
			if (document.documentElement.scrollTop > 1) {
				document.documentElement.scrollTop = 100;
			}
		});
	}
};
