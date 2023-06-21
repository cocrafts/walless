import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		padding: 0,
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 15,
		gap: 0,
		padding: 16,
		backgroundColor: '#0E141A',
		fontSize: 14,
	},
	text: {
		fontSize: 14,
		color: '#566674',
	},
	focus: {
		borderWidth: 1,
		borderColor: '#49596A',
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	itemIcon: {
		width: 18,
		height: 18,
		borderRadius: 8,
	},
	itemName: {
		color: '#566674',
		fontSize: 14,
	},
	rightIcon: {
		marginLeft: 'auto',
	},
});
export type SelectionRequiredFields = {
	id: string;
	name: string;
	icon: string;
};

export interface SelectionContext<T extends object> {
	selected?: T;
	title: string;
	items: T[];
	getRequiredFields: (item: T) => SelectionRequiredFields;
	onSelect: (item: T) => void;
}
