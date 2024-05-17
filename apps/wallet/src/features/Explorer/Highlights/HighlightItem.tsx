import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Animated, Image, StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowTopRight, Heart, Plus } from '@walless/icons';

const ITEM_WIDTH = 273;
interface AnimationFlatListProps {
	index: number;
	scrollXAnimated: Animated.Value;
	maxItems: number;
}
interface HighlightItemProps {
	coverUri: ImageSourcePropType;
	iconUri: ImageSourcePropType;
	title: string;
	description: string;
	loveCount: number;
	activeCount: number;
	isAdded?: boolean;
	animation?: AnimationFlatListProps;
	onPress?: () => void;
}

const HighlightItem: FC<HighlightItemProps> = ({
	coverUri,
	iconUri,
	title,
	description,
	loveCount,
	activeCount,
	isAdded,
	animation,
	onPress,
}) => {
	const { index, scrollXAnimated, maxItems } =
		animation as AnimationFlatListProps;
	const inputRange = [index - 1, index, index + 1];
	const translateX = scrollXAnimated.interpolate({
		inputRange,
		outputRange: [40, 0, -100],
	});

	const scale = scrollXAnimated.interpolate({
		inputRange,
		outputRange: [0.8, 1, 0.8],
	});

	const opacity = scrollXAnimated.interpolate({
		inputRange,
		outputRange: [1 - 1 / maxItems, 1, 0],
	});

	const animatedStyle = {
		transform: [{ translateX }, { scale }],
		opacity,
	};

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			<Image style={styles.coverImage} source={coverUri} />
			<View style={styles.infoContainer}>
				<Image style={styles.iconImage} source={iconUri} />
				<View style={styles.middlePart}>
					<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
						{title}
					</Text>
					<Text
						style={styles.description}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{description}
					</Text>
					<View style={styles.loveAndActiveContainer}>
						<View style={styles.loveAndActiveDisplay}>
							<Heart colors={['#D93737', '#D93737']} size={12} />
							<Text style={styles.loveText}>{loveCount}</Text>
						</View>
						<View style={styles.loveAndActiveDisplay}>
							<View style={styles.activeIcon} />
							<Text style={styles.activeText}>{activeCount}</Text>
						</View>
					</View>
				</View>
				<Hoverable style={styles.addBtn} onPress={onPress}>
					{isAdded ? <ArrowTopRight /> : <Plus />}
				</Hoverable>
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
		left: -ITEM_WIDTH / 2 - 20,
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
	loveAndActiveContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	loveAndActiveDisplay: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	activeIcon: {
		width: 10,
		height: 10,
		borderRadius: 6,
		backgroundColor: '#37B681',
	},
	activeText: {
		color: '#37B681',
		fontSize: 10,
	},
	loveText: {
		color: '#4E5C69',
		fontSize: 10,
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
