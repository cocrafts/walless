import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import type { StackScreenProps } from '@react-navigation/stack';
import { Button } from '@walless/gui';
import { modules } from '@walless/ioc';
import { type DashboardParamList, navigate } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

export const SettingScreen: FC<Props> = () => {
	const handleLogOut = async () => {
		await firebase.auth().signOut();
		await modules.storage.clearAllDocs();
		navigate('Authentication', { screen: 'Login' });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>SettingScreen</Text>
			<Button onPress={handleLogOut} title="Logout" />
		</View>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 20,
	},
});
