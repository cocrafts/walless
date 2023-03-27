import { FC, Fragment, useMemo } from 'react';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { WuiProvider } from '@walless/wui';
import { AppProps } from 'next/app';

import config from '../tamagui.config';

import '@tamagui/core/reset.css';
import '../style.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
	const [theme, setTheme] = useRootTheme();

	const contents = useMemo(() => {
		return <Component {...pageProps} />;
	}, [pageProps]);

	return (
		<Fragment>
			<script
				key="tamagui-animations-mount"
				dangerouslySetInnerHTML={{
					__html: `document.documentElement.classList.add('t_unmounted')`,
				}}
			/>
			<NextThemeProvider onChangeTheme={setTheme}>
				<WuiProvider config={config} theme={theme}>
					{contents}
				</WuiProvider>
			</NextThemeProvider>
		</Fragment>
	);
};

export default App;
