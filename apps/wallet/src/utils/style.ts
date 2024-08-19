import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
	// Flex
	flexGrow: {
		flexGrow: 1,
	},
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
	gap16: {
		gap: 16,
	},
	gap8: {
		gap: 8,
	},
	gap4: {
		gap: 4,
	},
	gap2: {
		gap: 2,
	},

	// General layout
	fullWidth: {
		width: '100%',
	},
	fullHeight: {
		height: '100%',
	},

	// Text
	fontSize16: {
		fontSize: 16,
	},
	fontSize15: {
		fontSize: 15,
	},
	fontSize13: {
		fontSize: 13,
	},
	fontSize12: {
		fontSize: 12,
	},
	textCta: {
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
	textNeutral7: {
		color: '#D7E0EA',
	},
	textNeutral8: {
		color: '#EBF0F6',
	},
	textHighlight: {
		color: 'white',
	},
	textCenter: {
		textAlign: 'center',
	},
	textRight: {
		textAlign: 'right',
	},
	textJustify: {
		textAlign: 'justify',
	},

	// Shadow (https://ethercreative.github.io/react-native-shadow-generator/)
	shadow2: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
});

export const colors = {
	tabNavigatorBg: '#081016',
	success: '#5FC591',
};
