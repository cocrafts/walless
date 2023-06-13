import { type FC, useEffect, useRef, useState } from 'react';
import { modalActions, ModalManager, View } from '@walless/gui';
import { type AppProps } from 'next/app';
import Head from 'next/head';

import 'raf/polyfill';

import '../styles/global.css';

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setRender] = useState({});
	const containerRef = useRef(null);

	useEffect(function updateState() {
		//  This effect makes reanimated work
		setRender({});
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<View ref={containerRef}>
				<Component {...pageProps} />
			</View>
			<ModalManager />
		</>
	);
};

export default App;
