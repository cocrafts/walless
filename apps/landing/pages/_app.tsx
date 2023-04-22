import { FC, Fragment } from 'react';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { GuiProvider } from '@walless/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';

import config from '../tamagui.config';

import '@tamagui/core/reset.css';
import '../style.css';

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	const [theme, setTheme] = useRootTheme();

	return (
		<Fragment>
			<script
				key="tamagui-animations-mount"
				dangerouslySetInnerHTML={{
					__html: `document.documentElement.classList.add('t_unmounted')`,
				}}
			/>
			<NextThemeProvider onChangeTheme={setTheme}>
				<GuiProvider
					disableInjectCSS
					disableRootThemeClass
					config={config}
					theme={theme}
				>
					<Head>
						<title>Walless</title>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
						<meta name="description" content="The first Web3 sandbox-wallet" />
					</Head>
					<Component {...pageProps} />
				</GuiProvider>
			</NextThemeProvider>
		</Fragment>
	);
};

export default App;
