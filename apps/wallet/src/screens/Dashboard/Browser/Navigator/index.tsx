import type { FC } from 'react';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { colors } from 'utils/style';
import { lighten }	from 'color2k';

interface Props {
	style?: StyleProp<ViewStyle>;
	url?: string;
}

export const BrowserNavigator: FC<Props> = ({ style, }) => {
	return (
		<View style={[styles.container, style]}>
			<TextInput style={styles.input} value="value" />
		</View>
	);
};

export default BrowserNavigator;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.tabNavigatorBg, 
	},
	input: {
		margin: 12,
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 8,
		backgroundColor: lighten(colors.tabNavigatorBg, 0.05),
		color: '#FFFFFF',
	},
});
