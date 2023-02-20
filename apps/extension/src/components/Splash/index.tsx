import { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appActions } from 'utils/state/app';

const styles = StyleSheet.create({
	container: {},
});

export const SplashScreen: FC = () => {
	useEffect(() => {
		appActions.setLoading(false);
	}, []);

	return (
		<View style={styles.container}>
			<Text>SplashScreen</Text>
		</View>
	);
};

export default SplashScreen;
