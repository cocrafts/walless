import { WebView } from 'react-native-webview';

export const FlowXFinance = () => {
	return (
		<WebView
			source={{ uri: 'https://flowx.finance/swap' }}
			style={styles.webView}
		/>
	);
};

const styles = {
	webView: {
		flex: 1,
	},
};

export default FlowXFinance;
