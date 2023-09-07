import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { modalActions, ModalManager } from '@walless/gui';
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
			<View ref={containerRef}>
				<Component {...pageProps} />
				<ModalManager />
			</View>
		</>
	);
};

export default App;
