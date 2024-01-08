import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { Book, Message, Shield, Window } from '@walless/icons';

import ForwardLink from './ForwardLink';

export const HelpCenter = () => {
	return (
		<View style={styles.container}>
			<ForwardLink
				link="https://discord.gg/uG2JEmTZXZ"
				title="Feedback to us"
				icon={<Message />}
			/>
			<ForwardLink
				link="https://discord.gg/3v7jwG45pe"
				title="Contact Support"
				icon={<Book />}
			/>

			<ForwardLink
				link="https://walless.io/privacy-policy"
				title="Privacy Policy"
				icon={<Shield size={16} />}
			/>

			<ForwardLink
				link="https://walless.io/"
				title="About Walless"
				icon={<Window />}
			/>
		</View>
	);
};

export default HelpCenter;

const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
});
