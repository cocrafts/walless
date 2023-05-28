import { StyleSheet } from 'react-native';

export const getScreenTitle = (
	isCreation: boolean,
	isConfirmation: boolean,
) => {
	if (isCreation) {
		if (isConfirmation) {
			return 'Create your passcode';
		} else {
			return 'Confirm your passcode';
		}
	}

	return 'Enter your passcode';
};

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 40,
		paddingTop: 50,
		paddingBottom: 20,
		maxWidth: 410,
		maxHeight: 600,
	},
	logo: {
		width: 83,
		height: 43,
	},
	titleContainer: {
		paddingVertical: 40,
	},
	title: {
		paddingBottom: 10,
		fontSize: 20,
		textAlign: 'center',
	},
	subText: {
		color: '#566674',
		textAlign: 'center',
	},
	footerContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	link: {
		color: '#19A3E1',
	},
});
