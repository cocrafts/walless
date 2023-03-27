import { Children } from 'react';
import { AppRegistry } from 'react-native';
import NextDocument, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';

import Tamagui from '../tamagui.config';

export default class Document extends NextDocument {
	static async getInitialProps({ renderPage }: DocumentContext) {
		AppRegistry.registerComponent('Main', () => Main);

		const page = await renderPage();
		// eslint-disable-next-line
		const { getStyleElement } = (AppRegistry as any).getApplication('Main');
		const styleInner = { __html: Tamagui.getCSS() };
		const styles = [
			getStyleElement(),
			<style key="style" dangerouslySetInnerHTML={styleInner} />,
		];

		return { ...page, styles: Children.toArray(styles) };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link href={fontUri} rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

const fontUri =
	'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,300;1,400;1,700&display=swap';
