import { StyleSheet } from 'react-native';

export enum ModalId {
	Error = 'Error',
	Notification = 'Notification',
	Receive = 'Receive',
	RemoveLayout = 'RemoveLayout',
	RequirePasscode = 'RequirePasscode',
	Send = 'Send',
	TransactionDetails = 'TransactionDetails',
}

export const modalStyles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#141B21',
		justifyContent: 'space-between',
		gap: 60,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		paddingTop: 10,
		paddingBottom: 40,
		paddingHorizontal: 28,
	},
});
