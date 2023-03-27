import { FC, Suspense, useEffect } from 'react';
import { AppProps } from 'next/app';
import { TamaguiProvider } from 'tamagui';
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
		<TamaguiProvider config={config}>
			<Suspense>
				<Component {...pageProps} />
			</Suspense>
		</TamaguiProvider>
	);
};

export default App;
