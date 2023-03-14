import { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';

import { parseAndNotifyResult } from '../../../../extension/scripts/worker/w3a-response';

const styles = StyleSheet.create({
	container: {},
});

export const AuthResponseScreen: FC = () => {
	useEffect(() => {
		parseAndNotifyResult();
	}, []);

	return (
		<View style={styles.container}>
			<Text>loading...</Text>
		</View>
	);
};

export default AuthResponseScreen;
