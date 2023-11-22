import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

export const TRexRunner = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleOnLoad = () => {
		iframeRef.current?.contentWindow?.focus();
	};

	return (
		<View style={styles.container}>
			<iframe
				ref={iframeRef}
				src="https://cdn.stormgate.io/documents/runner/index.html"
				width={352}
				height={300}
				style={{ borderColor: 'transparent' }}
				onLoad={handleOnLoad}
			/>
		</View>
	);
};

export default TRexRunner;

const styles = StyleSheet.create({
	container: {
		width: 352,
		height: 600,
		justifyContent: 'center',
	},
});
