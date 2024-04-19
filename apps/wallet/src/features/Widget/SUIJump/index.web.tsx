import { useRef } from 'react';
import { StyleSheet } from 'react-native';

export const SUIJump = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleOnLoad = () => {
		iframeRef.current?.contentWindow?.focus();
	};

	return (
		<iframe
			ref={iframeRef}
			src="https://suipien-jump.vercel.app/"
			style={styles.container}
			onLoad={handleOnLoad}
		/>
	);
};

export default SUIJump;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderColor: 'transparent',
	},
});
