import { Head, Html, Main, NextScript } from 'next/document';

export const Document = () => {
	return (
		<Html
			lang="en"
			style={{
				backgroundColor: '#19232C',
			}}
		>
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
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;

const fontUri =
	'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,900&display=swap';
