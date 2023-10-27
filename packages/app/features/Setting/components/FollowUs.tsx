import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { Twitter } from '@walless/icons';

import ForwardLink from './ForwardLink';

export const FollowUs = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Follow Us</Text>

			<ForwardLink
				link="https://twitter.com/walless_wallet"
				title="Follow us on Twitter"
				icon={<Twitter color="#0694D3" />}
				iconBackground="#243F56"
			/>
		</View>
	);
};

export default FollowUs;

const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
	title: {
		color: '#566674',
	},
});
