import { WebView } from 'react-native-webview';

export const TRexRunner = () => {
	return (
		<WebView
			source={{ uri: 'https://cdn.stormgate.io/documents/runner/index.html' }}
			style={{ flex: 1 }}
		/>
	);
};

export default TRexRunner;
