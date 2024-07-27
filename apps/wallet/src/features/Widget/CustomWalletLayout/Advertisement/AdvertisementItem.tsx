import type { FC } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';
import type { CustomWalletAdvertisement } from '@walless/core';
import { Anchor, Text } from '@walless/gui';
import { ArrowTopRight } from '@walless/icons';

type ItemProps = CustomWalletAdvertisement & {
	currentIndex: number;
	index: number;
	offsetX: SharedValue<number>;
	animatedValue: SharedValue<number>;
};

const IMAGE_SIZE = 266;

const AdvertisementItem: FC<ItemProps> = ({
	image,
	link,
	title,
	currentIndex,
	index,
	offsetX,
	animatedValue,
}) => {
	const imageSrc = { uri: image };

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX:
						(index - currentIndex) * (IMAGE_SIZE + 20) + offsetX.value,
				},
			],
		};
	}, [currentIndex, offsetX, animatedValue]);

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
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
		position: 'absolute',
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
	},
	title: {
		color: '#ffffff',
		fontWeight: '500',
	},
});
