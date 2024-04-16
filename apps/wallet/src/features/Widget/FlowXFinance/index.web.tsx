import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import {
	initializeTezosWallet,
	resolveTargetWindow,
} from 'browser/content/tezos';

export const FlowXFinance = () => {
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

	useEffect(() => {
		window.postMessage('hello world from Walless ext');
	}, []);

	return (
		<View style={styles.container}>
			<iframe
				ref={iframeRef}
				// src="https://flowx.finance/swap"
				src="http://localhost:3011"
				width={352}
				height={650}
				style={{ borderColor: 'transparent' }}
				onLoad={handleOnLoad}
			/>
		</View>
	);
};

export default FlowXFinance;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
