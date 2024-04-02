import { WebView } from 'react-native-webview';

export const SUIJump = () => {
	return (
		<WebView
			source={{ uri: 'https://suipien-jump.vercel.app/' }}
			style={{ flex: 1 }}
		/>
	);
};

export default SUIJump;
