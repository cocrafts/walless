import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import EmailSubscription from './EmailSubscription';
import SocialAnchors from './SocialAnchors';
import WallessByStormgate from './WallessByStormgate';

const UpperPart = () => {
	return (
		<View style={styles.container}>
			<WallessByStormgate />
			<View style={styles.socialContainer}>
				<EmailSubscription />
				<SocialAnchors />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	socialContainer: {
		gap: 36,
		alignItems: 'flex-end',
	},
});

export default UpperPart;
