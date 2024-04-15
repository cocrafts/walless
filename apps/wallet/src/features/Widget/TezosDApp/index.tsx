import { useRef } from 'react';
import { StyleSheet } from 'react-native';

export const TezosDApp = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleOnLoad = () => {
		iframeRef.current?.contentWindow?.focus();
	};

	return (
		<iframe
			ref={iframeRef}
			src="http://localhost:3011"
			style={styles.container}
			onLoad={handleOnLoad}
		></iframe>
	);
};

export default TezosDApp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderColor: 'transparent',
	},
});
