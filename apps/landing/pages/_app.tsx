import { FC, Fragment, ReactElement, useMemo } from 'react';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { GuiProvider } from '@walless/gui';
import { AppProps } from 'next/app';

import config from '../tamagui.config';

import '@tamagui/core/reset.css';
import '../style.css';

export const App: FC<AppProps> = (props) => {
	const [theme, setTheme] = useRootTheme();

	const contents = useMemo(() => {
		return <ContentInner {...props} />;
	}, [props.pageProps]);

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
					{contents}
				</GuiProvider>
			</NextThemeProvider>
		</Fragment>
	);
};

export default App;

const ContentInner: FC<AppProps> = ({ Component, pageProps }) => {
	/* eslint-disable-next-line */
	const layoutFunc = (Component as any).getLayout;
	const getLayout = layoutFunc || ((page: ReactElement) => page);

	return getLayout(
		<Fragment>
			<Component {...pageProps} />
		</Fragment>,
	);
};
