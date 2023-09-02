import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { navigate } from 'utils/navigation';

export const DashboardScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Dashboard</Text>
			<View style={styles.buttonContainer}>
				<Button
					onPress={() => {
						navigate('Login');
					}}
					title="Login"
				/>
				<Button
					onPress={() => {
						navigate('DeprecatedPasscode');
					}}
					title="Deprecated Passcode"
				/>
				<Button
					onPress={() => {
						navigate('CreatePasscode');
					}}
					title="Create Passcode"
				/>
				<Button
					onPress={() => {
						navigate('Recovery');
					}}
					title="Recovery"
				/>
			</View>
		</View>
	);
};

export default DashboardScreen;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 50,
		fontWeight: '500',
	},
	buttonContainer: {
		marginTop: 20,
		gap: 10,
	},
});
