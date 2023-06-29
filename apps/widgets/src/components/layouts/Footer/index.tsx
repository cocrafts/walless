import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import BottomPart from './components/BottomPart';
import UpperPart from './components/UpperPart';

export const Footer = () => {
	return (
		<View style={styles.footerContainer}>
			<UpperPart />
			<BottomPart />
		</View>
	);
};

const styles = StyleSheet.create({
	footerContainer: {
		backgroundColor: '#131B22',
		paddingVertical: 36,
		marginTop: 64,
	},
});

export default Footer;
