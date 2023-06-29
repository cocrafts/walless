import { type FC, useEffect, useState } from 'react';
import SEOHead from 'components/SEOHead';
import { type AppProps } from 'next/app';

import 'raf/polyfill';

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setRender] = useState({});

	/**
	 * This effect makes reanimated work
	 * */
	useEffect(function updateState() {
		setRender({});
	}, []);

	return (
		<>
			<SEOHead />
			<Component {...pageProps} />
		</>
	);
};

export default App;