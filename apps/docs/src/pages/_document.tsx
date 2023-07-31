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
				<link href={robotoUri} rel="stylesheet" />
				<link href={robotoSlabUri} rel="stylesheet" />
			</Head>
			<body
				style={{
					height: '100%',
				}}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;

const robotoUri =
	'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap';
const robotoSlabUri =
	'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500&display=swap';
