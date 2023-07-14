import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

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
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default App;
