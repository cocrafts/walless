import { StyleSheet } from 'react-native';
import { Button, modalActions, Text, View } from '@walless/gui';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase';
import modules from 'utils/ioc';
import { router } from 'utils/routing';

const ConfirmModal = () => {
	const handleLogOut = async () => {
		modalActions.destroy('log-out-modal');
		await signOut(auth);
		await modules.storage.clearAllDocs();
		await router.navigate('/login');
	};

	const handleCancelLogOut = () => {
		modalActions.hide('log-out-modal');
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Log out</Text>
				<Text style={styles.subText}>
					Are you sure that you want to log out?
				</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.cancelButton}
					onPress={handleCancelLogOut}
					title="Cancel"
				/>
				<Button
					style={styles.logOutButton}
					onPress={handleLogOut}
					title="Log Out"
				/>
			</View>
		</View>
	);
};

export default ConfirmModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 230,
		borderRadius: 16,
	},
	titleContainer: {
		flexGrow: 1,
		paddingHorizontal: 20,
		paddingVertical: 28,
		backgroundColor: '#1F2A34',
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		gap: 6,
	},
	title: {
		fontSize: 20,
		color: '#ffffff',
	},
	subText: {
		color: '#A4B3C1',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: '#19232C',
		borderBottomRightRadius: 16,
		borderBottomLeftRadius: 16,
		gap: 8,
	},
	logOutButton: {
		paddingHorizontal: 20,
		backgroundColor: '#A54545',
	},
	cancelButton: {
		backgroundColor: 'transparent ',
	},
});
