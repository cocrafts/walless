import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	logoSrc: ImageSourcePropType;
	logoSize: number;
}

const InvitationHeader: FC<Props> = ({ logoSrc, logoSize }) => {
	const logoStyle = {
		width: logoSize,
		height: logoSize,
	};
	return (
		<View style={styles.container}>
			<Image style={logoStyle} source={logoSrc} resizeMode="cover" />
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
