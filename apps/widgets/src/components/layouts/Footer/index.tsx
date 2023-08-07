import { StyleSheet } from 'react-native';
import { BulletSeparator } from '@walless/app';
import { View } from '@walless/gui';
import { sharedStyles } from 'utils/style';

import BottomPart from './components/BottomPart';
import UpperPart from './components/UpperPart';

export const Footer = () => {
	return (
		<View style={styles.footerContainer}>
			<View style={[{ gap: 64 }, sharedStyles.container]}>
				<UpperPart />
				<BulletSeparator noBullet={true} />
				<BottomPart />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	footerContainer: {
		backgroundColor: '#131B22',
		paddingVertical: 72,
		paddingHorizontal: 40,
		marginTop: 64,
	},
});

export default Footer;
