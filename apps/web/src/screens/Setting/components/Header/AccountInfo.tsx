import { type FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { type UserProfile } from '@walless/core';
import { Text, View } from '@walless/gui';

interface Props {
	profile: UserProfile;
}

const AccountInfo: FC<Props> = ({ profile }) => {
	const displayName = profile.name || profile.email || 'Anonymous';
	const imageSource = { uri: profile.profileImage };

	return (
		<View style={styles.container}>
			<Image source={imageSource} style={styles.image} />
			<Text style={styles.text}>{displayName}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	text: {
		fontSize: 20,
		color: 'white',
	},
});

export default AccountInfo;
