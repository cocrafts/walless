import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

export const SUIJump = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleOnLoad = () => {
		iframeRef.current?.contentWindow?.focus();
	};

	return (
		<View style={styles.container}>
			<iframe
				ref={iframeRef}
				src="https://suipien-jump.vercel.app/"
				width={352}
				height={590}
				style={{ borderColor: 'transparent' }}
				onLoad={handleOnLoad}
			/>
		</View>
	);
};

export default SUIJump;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});
