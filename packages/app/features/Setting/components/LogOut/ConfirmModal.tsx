import { StyleSheet } from 'react-native';
import { Button, modalActions, Text, View } from '@walless/gui';
import { utils } from '@walless/ioc';

const ConfirmModal = () => {
	const handleLogOut = async () => {
		if (utils.logOut) utils.logOut();
		modalActions.hide('log-out-modal');
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
					title="Cancel"
					style={styles.cancelButton}
					onPress={handleCancelLogOut}
				/>
				<Button
					title="Log out"
					style={styles.logOutButton}
					onPress={handleLogOut}
				/>
			</View>
		</View>
	);
};

export default ConfirmModal;

const styles = StyleSheet.create({
	container: {
		width: 300,
		alignSelf: 'center',
		borderRadius: 16,
		backgroundColor: 'green',
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
