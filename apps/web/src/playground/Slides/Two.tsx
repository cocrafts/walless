import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { sharedStyles } from './shared';

export const Two: FC = () => {
	return (
		<View style={[styles.container, sharedStyles.container]}>
			<Text>Two</Text>
		</View>
	);
};

export default Two;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'yellow',
	},
});
