import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
	container: {
		padding: 0,
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 336,
		height: 48,
		borderRadius: 15,
		gap: 0,
		padding: 16,
		backgroundColor: '#0E141A',
		fontSize: 20,
	},
	text: {
		fontSize: 16,
	},
});
export type SelectionRequiredFields = {
	id: string;
	name: string;
	icon: string;
};

export interface SelectionContext<T extends object> {
	selected: T;
	title: string;
	items: T[];
	getRequiredFields: (item: T) => SelectionRequiredFields;
	onSelect: (item: T) => void;
}
