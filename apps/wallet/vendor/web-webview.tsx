import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WebView = forwardRef((_, ref) => {
	return (
		<View ref={ref} style={styles.container}>
			<Text>WebView</Text>
		</View>
	);
});

WebView.displayName = 'WebView';

export default WebView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
