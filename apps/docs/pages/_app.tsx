import { type FC } from 'react';
import { type AppProps } from 'next/app';
import Head from 'next/head';

import 'raf/polyfill';

export const App: FC<AppProps> = ({ Component, pageProps }) => {
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
