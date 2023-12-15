import { useEffect } from 'react';
import { Linking } from 'react-native';
import { logger } from '@walless/core';

export const useDeepLinking = () => {
	useEffect(() => {
		Linking.getInitialURL().then((initialURL) => {
			if (initialURL) {
				const { href } = new URL(initialURL);
				logger.debug('TODO: deep-linking for e.g Extension popup', href);
			}
		});
	}, []);
};
