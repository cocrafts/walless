import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@walless/gui';

export const NotFoundWidget: FC = () => {
	return (
		<View style={styles.container}>
			<Text>Widget not found!</Text>
		</View>
	);
};

export default NotFoundWidget;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
