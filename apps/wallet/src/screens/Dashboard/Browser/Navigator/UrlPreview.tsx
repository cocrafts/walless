import type { FC } from 'react';
import { useEffect, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedPressable } from '@walless/gui';
import { Lock } from '@walless/icons';

interface Props {
	url: string;
	onPress?: () => void;
}

export const UrlPreview: FC<Props> = ({ url, onPress }) => {
	const opacity = useSharedValue<number>(0);
	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	}, []);

	const formattedUrl = useMemo(() => {
		try {
			const urlObject = new URL(url);
			return urlObject.hostname;
		} catch {
			return url;
		}
	}, [url]);

	useEffect(() => {
		opacity.value = withTiming(1, { duration: 250 });
	}, []);

	return (
		<AnimatedPressable
			style={[styles.container, animatedStyle]}
			onPress={onPress}
		>
			<Lock size={12} />
			<Text style={styles.previewText}>{formattedUrl}</Text>
		</AnimatedPressable>
	);
};

export default UrlPreview;

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
	},
	previewText: {
		color: '#FFFFFF',
	},
});
