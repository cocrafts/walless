import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
	// Flex
	flexCenter: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	flexRowWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	flexRowBetween: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	gap8: {
		gap: 8,
	},
	gap4: {
		gap: 4,
	},

	// General layout
	widthFull: {
		width: '100%',
	},

	// Text
	fontSize16: {
		fontSize: 16,
	},
	fontSize13: {
		fontSize: 13,
	},
	textBlue: {
		color: '#17A3E1',
	},
	textError: {
		color: '#AE383A',
	},
	textNeutral5: {
		color: '#798896',
	},
	textNeutral6: {
		color: '#A4B3C1',
	},
	textCenter: {
		textAlign: 'center',
	},
});

export const colors = {
	tabNavigatorBg: '#081016',
};
