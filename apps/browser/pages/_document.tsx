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
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
