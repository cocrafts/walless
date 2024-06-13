import type { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { runtime } from '@walless/core';
import { ArrowTopRight, Plus } from '@walless/icons';
import type { WidgetDocument } from '@walless/store';
import assets from 'utils/assets';
import { useWidgets } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { addWidgetToStorage } from 'utils/storage';

import LoveAndActiveCount from './LoveAndActiveCount';

const ITEM_WIDTH = 273;
interface AnimationFlatListProps {
	index: number;
	activeIndex: number;
	animatedValue: SharedValue<number>;
	prevIndex: SharedValue<number>;
	maxItems: number;
}
interface HighlightItemProps {
	widget: WidgetDocument;
	animation?: AnimationFlatListProps;
}

const HighlightItem: FC<HighlightItemProps> = ({ animation, widget }) => {
	const addedWidgets = useWidgets().map((widget) => widget._id);

	const handleOpenWidget = (id: string) => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Widget',
				params: { id },
			},
		});
	};

	const handleAddWidget = (widget: WidgetDocument) => {
		addWidgetToStorage(widget._id, widget);
		handleOpenWidget(widget._id);
	};

	const handleOnPress = () => {
		if (addedWidgets.includes(widget._id)) {
			handleOpenWidget(widget._id);
		} else handleAddWidget(widget);
	};

	const isAdded = addedWidgets.includes(widget._id);
	const { index, maxItems, animatedValue } =
		animation as AnimationFlatListProps;

	const inputRange = [index - 1, index, index + 1];
	const animatedStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			animatedValue.value,
			inputRange,
			[40, 0, -100],
		);

		const scale = interpolate(animatedValue.value, inputRange, [0.8, 1, 0.8]);

		const opacity = interpolate(animatedValue.value, inputRange, [
			1 - 1 / maxItems,
			1,
			0,
		]);

		return {
			transform: [{ translateX }, { scale }],
			opacity,
		};
	}, [animatedValue]);

	const coverImgResource = runtime.isMobile
		? assets.widget[widget._id]?.storeMeta.coverUri
		: { uri: widget.storeMeta.coverUri };

	const logoImgResource = runtime.isMobile
		? assets.widget[widget._id]?.storeMeta.iconUri
		: { uri: widget.storeMeta.iconUri };

	const containerStyle = {
		zIndex: maxItems - index,
	};

	return (
		<Animated.View style={[styles.container, containerStyle, animatedStyle]}>
			<Image style={styles.coverImage} source={coverImgResource} />
			<View style={styles.infoContainer}>
				<Image style={styles.iconImage} source={logoImgResource} />
				<View style={styles.middlePart}>
					<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
						{widget.name}
					</Text>
					<Text
						style={styles.description}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{widget.storeMeta.description}
					</Text>
					<LoveAndActiveCount
						loveCount={widget.storeMeta.loveCount}
						activeCount={widget.storeMeta.activeCount}
					/>
				</View>
				<TouchableOpacity style={styles.addBtn} onPress={handleOnPress}>
					{isAdded ? <ArrowTopRight /> : <Plus />}
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

export default HighlightItem;

const styles = StyleSheet.create({
	container: {
		width: ITEM_WIDTH,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#23303C',
		position: 'absolute',
	},
	coverImage: {
		width: ITEM_WIDTH,
		height: 143,
	},
	infoContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 11,
		gap: 10,
	},
	iconImage: {
		width: 43,
		height: 43,
		borderRadius: 10,
	},
	middlePart: {
		flex: 1,
		gap: 4,
	},
	title: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '500',
	},
	addBtn: {
		alignSelf: 'center',
		backgroundColor: '#19A3E1',
		padding: 6,
		borderRadius: 6,
	},
	description: {
		color: '#798997',
		fontSize: 12,
	},
});
