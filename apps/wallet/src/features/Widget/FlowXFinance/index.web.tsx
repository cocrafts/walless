import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

export const FlowXFinance = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleOnLoad = () => {
		iframeRef.current?.contentWindow?.focus();
	};

	return (
		<View style={styles.container}>
			<iframe
				ref={iframeRef}
				src="https://flowx.finance/swap"
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
