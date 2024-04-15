import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
	initializeTezosWallet,
	resolveTargetWindow,
} from 'browser/content/tezos';

export const TezosDApp = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleOnLoad = () => {
		iframeRef.current?.contentWindow?.focus();
	};

	useEffect(() => {
		if (!iframeRef.current) {
			console.log('not found ref');
			return;
		}
		console.log('resolve target window', iframeRef.current.contentWindow);
		resolveTargetWindow(iframeRef.current.contentWindow as never);
		initializeTezosWallet();
	}, [iframeRef]);

	return (
		<iframe
			ref={iframeRef}
			src="http://localhost:3011"
			style={styles.container}
			onLoad={handleOnLoad}
		/>
	);
};

export default TezosDApp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'yellow',
		borderColor: 'transparent',
	},
});
