import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import Logo from 'components/Logo';

interface Props {
	logoSize: number;
	style?: ViewStyle;
}

const InvitationHeader: FC<Props> = ({ logoSize, style }) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.logoContainer}>
				<Logo size={logoSize} />
			</View>
			<Text style={styles.greetingText}>Welcome to Walless</Text>
			<Text style={styles.reminderText}>
				You’ll need to enter invitation code to access{'\n'}Private Beta.
			</Text>
		</View>
	);
};

export default InvitationHeader;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	logoContainer: {
		marginVertical: 14,
	},
	greetingText: {
		fontSize: 20,
		fontWeight: '600',
		color: '#fff',
		marginBottom: 8,
	},
	reminderText: {
		fontSize: 14,
		fontWeight: '400',
		textAlign: 'center',
		color: '#566674',
	},
});
