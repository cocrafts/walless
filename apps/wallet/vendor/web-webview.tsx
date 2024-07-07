import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@walless/gui';

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
