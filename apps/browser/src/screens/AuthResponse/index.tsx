import { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { parseAndNotifyResult } from '../../../worker/auth-parser';

const styles = StyleSheet.create({
	container: {},
});

export const AuthResponseScreen: FC = () => {
	useEffect(() => {
		parseAndNotifyResult();
	}, []);

	return (
		<View style={styles.container}>
			<Text onPress={parseAndNotifyResult}>loading...</Text>
		</View>
	);
};

export default AuthResponseScreen;
