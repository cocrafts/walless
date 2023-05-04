import { FC, Fragment } from 'react';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { GuiProvider } from '@walless/ui';
import SEOHead from 'components/SEOHead';
import { AppProps } from 'next/app';

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
					<SEOHead />
					<Component {...pageProps} />
				</GuiProvider>
			</NextThemeProvider>
		</Fragment>
	);
};

export default App;
