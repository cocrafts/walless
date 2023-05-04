import { type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { sharedStyles } from './shared';

export const One: FC = () => {
	return (
		<View style={[styles.container, sharedStyles.container]}>
			<Text>One</Text>
		</View>
	);
};

export default One;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red',
	},
});
