import type { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		padding: 0,
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 0,
		backgroundColor: '#0E141A',
		fontSize: 14,
		borderRadius: 15,
		height: 48,
		paddingHorizontal: 16,
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
		width: 20,
		height: 20,
		borderRadius: 10,
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
	notFoundText?: string;
	items: T[];
	getRequiredFields: (item: T) => SelectionRequiredFields;
	onSelect: (item: T) => void;
	itemStyle?: StyleProp<ViewStyle>;
	itemIconStyle?: StyleProp<ImageStyle>;
	selectedItemStyle?: StyleProp<ViewStyle>;
	selectedItemIconStyle?: StyleProp<ImageStyle>;
}
