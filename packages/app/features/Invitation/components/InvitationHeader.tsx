import { type FC } from 'react';
import { type ImageSourcePropType, Image, StyleSheet } from 'react-native';
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
			<Text style={styles.reminderText}>
				Invitation code is require to access{'\n'}Walless Beta
			</Text>
		</View>
	);
};

export default InvitationHeader;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	reminderText: {
		fontSize: 17,
		textAlign: 'center',
	},
});
