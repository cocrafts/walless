import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import type { CustomWalletAdvertisement } from '@walless/core';
import { Anchor, Text } from '@walless/gui';
import { ArrowTopRight } from '@walless/icons';

const AdvertisementItem: FC<CustomWalletAdvertisement> = ({
	image,
	link,
	title,
}) => {
	const imageSrc = { uri: image };

	return (
		<Animated.View style={[styles.container]}>
			<Image style={styles.image} source={imageSrc} />
			<Anchor style={styles.linkContainer} href={link}>
				<Text style={styles.title}>{title}</Text>
				<ArrowTopRight />
			</Anchor>
		</Animated.View>
	);
};

export default AdvertisementItem;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		overflow: 'hidden',
	},
	image: {
		width: 266,
		height: 118,
	},
	linkContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		paddingHorizontal: 12,
		backgroundColor: '#0C334E',
	},
	title: {
		color: '#ffffff',
		fontWeight: '500',
	},
});
