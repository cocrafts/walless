import type { FC } from 'react';
import { useRef } from 'react';
import { Fragment, useEffect, useState } from 'react';
import type { View as ViewType } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { modalActions, ModalManager } from '@walless/gui';
import { GuiProvider } from '@walless/ui';
import SEOHead from 'components/SEOHead';
import type { AppProps } from 'next/app';

import 'raf/polyfill';

import config from '../tamagui.config';

import '@tamagui/core/reset.css';
import '../style.css';

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	const [theme, setTheme] = useRootTheme();
	const [, setRender] = useState({});

	const containerRef = useRef<ViewType>();

	useEffect(function updateState() {
		//  This effect makes reanimated work
		setRender({});
	}, []);

	useEffect(function setContainerRef() {
		modalActions.setContainerRef(containerRef as never);
	}, []);

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
					<View ref={containerRef} style={styles.container}>
						<Component {...pageProps} />
						<ModalManager />
					</View>
				</GuiProvider>
			</NextThemeProvider>
		</Fragment>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});
