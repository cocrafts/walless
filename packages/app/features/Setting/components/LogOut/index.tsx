import { StyleSheet, TouchableOpacity } from 'react-native';
import { modalActions, Text, View } from '@walless/gui';
import { LogOut as LogOutIcon } from '@walless/icons';

import ConfirmModal from './ConfirmModal';

export const LogOut = () => {
	const handleShowLogOutModal = () => {
		modalActions.show({
			id: 'log-out-modal',
			component: ConfirmModal,
		});
	};

	return (
		<TouchableOpacity style={styles.container} onPress={handleShowLogOutModal}>
			<View style={styles.titleContainer}>
				<View style={styles.iconContainer}>
					<LogOutIcon color="#A45151" size={16} />
				</View>
				<Text style={styles.title}>Log out</Text>
			</View>
		</TouchableOpacity>
	);
};

export default LogOut;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		padding: 12,
		hoverStyle: {
			backgroundColor: '#1F2A34',
		},
	},
	iconContainer: {
		width: 30,
		height: 30,
		borderRadius: 8,
		backgroundColor: '#422626',
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
		gap: 12,
		margin: 0,
	},
	title: {
		color: '#A45151',
	},
});
