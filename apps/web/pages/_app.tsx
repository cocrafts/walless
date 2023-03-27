import { FC, Suspense, useEffect } from 'react';
import { WuiProvider } from '@walless/wui';
import { AppProps } from 'next/app';
import { runBridge } from 'utils/bridge';

import 'raf';
import 'setimmediate';

import config from '../tamagui.config';

import '@tamagui/core/reset.css';
import '../style.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
	useEffect(() => {
		runBridge();
	}, []);

	return (
		<WuiProvider config={config}>
			<Suspense>
				<Component {...pageProps} />
			</Suspense>
		</WuiProvider>
	);
};

export default App;
