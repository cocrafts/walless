import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { View } from 'react-native';
import { modalActions } from '@walless/gui';
import SEOHead from 'components/SEOHead';
import { type AppProps } from 'next/app';

import 'raf/polyfill';

import '../../public/reset.css';

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setRender] = useState({});
	const containerRef = useRef<View>(null);

	useEffect(function updateState() {
		/**
		 * This effect makes reanimated work
		 * */
		setRender({});
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<>
			<SEOHead />
			<Component {...pageProps} ref={containerRef} />
		</>
	);
};

export default App;
