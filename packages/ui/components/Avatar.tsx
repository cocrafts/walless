import React from 'react';
import { Image, ImageStyle, StyleSheet, Text, View } from 'react-native';

interface Props {
	size?: number;
	characters?: string;
	imageUri?: string;
}

export const Avatar: React.FC<Props> = ({
	size = 36,
	characters,
	imageUri,
}) => {
	const avatarSrc = { uri: imageUri };
	const containerStyle: ImageStyle = {
		width: size,
		height: size,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
	};

	return (
		<View style={containerStyle}>
			{imageUri ? (
				<Image style={containerStyle} source={avatarSrc} />
			) : (
				<Text style={styles.character}>{characters?.[0] || '?'}</Text>
			)}
		</View>
	);
};

export default Avatar;

const styles = StyleSheet.create({
	character: {
		color: 'white',
		fontSize: 24,
	},
});
