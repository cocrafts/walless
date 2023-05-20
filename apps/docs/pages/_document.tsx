import { Children } from 'react';
import { AppRegistry } from 'react-native';
import NextDocument, {
	type DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';

const normalizeNextElements = `
	#__next {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
`;

export default class Document extends NextDocument {
	static async getInitialProps({ renderPage }: DocumentContext) {
		AppRegistry.registerComponent('Main', () => Main);

		// eslint-disable-next-line
		const {getStyleElement} = (AppRegistry as any).getApplication('Main');
		const page = await renderPage();
		const styles = [
			<style
				key="style"
				dangerouslySetInnerHTML={{ __html: normalizeNextElements }}
			/>,
			getStyleElement(),
		];

		return { ...page, styles: Children.toArray(styles) };
	}

	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					<link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						crossOrigin="anonymous"
						href="https://fonts.gstatic.com"
					/>
					<link href={fontUri} rel="stylesheet" />
				</Head>
				<body style={{ height: '100%', overflow: '100%' }}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

const fontUri =
	'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,900&display=swap';
