import type { FC } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Hoverable, Text } from '@walless/gui';

export interface GradientDirection {
	start: { x: number; y: number };
	end: { x: number; y: number };
}

export const gradientDirection = {
	LeftToRight: {
		start: { x: 0, y: 0 },
		end: { x: 1, y: 0 },
	},
	RightToLeft: {
		start: { x: 1, y: 0 },
		end: { x: 0, y: 0 },
	},
	TopToBottom: {
		start: { x: 0, y: 0 },
		end: { x: 0, y: 1 },
	},
	BottomToTop: {
		start: { x: 0, y: 1 },
		end: { x: 0, y: 0 },
	},
	TopRightToBottomLeft: {
		start: { x: 1, y: 0 },
		end: { x: 0, y: 1 },
	},
	TopLeftToBottomRight: {
		start: { x: 0, y: 0 },
		end: { x: 1, y: 1 },
	},
	BottomLeftToTopRight: {
		start: { x: 0, y: 1 },
		end: { x: 1, y: 0 },
	},
	BottomRightToTopLeft: {
		start: { x: 1, y: 1 },
		end: { x: 0, y: 0 },
	},
};

export interface TabItemStyle {
	style?: ViewStyle;
	linearGradient?: {
		direction: GradientDirection;
		colors: string[];
	};
	textStyle?: TextStyle;
}

export interface TabAble {
	id: string;
	title: string;
}

interface Props {
	item: TabAble;
	tabStyle?: TabItemStyle;
	onPress?: (item: TabAble) => void;
}

export const TabItem: FC<Props> = ({ item, tabStyle, onPress }) => {
	const containerStyle = tabStyle?.style;
	const linearGradientStyle = tabStyle?.linearGradient;
	console.log(linearGradientStyle);

	if (linearGradientStyle) {
		return (
			<Hoverable style={styles.hoverable} onPress={() => onPress?.(item)}>
				<LinearGradient
					style={[styles.container, containerStyle]}
					colors={linearGradientStyle.colors}
					start={linearGradientStyle.direction.start}
					end={linearGradientStyle.direction.end}
				>
					<Text style={[styles.title, tabStyle?.textStyle]}>{item.title}</Text>
				</LinearGradient>
			</Hoverable>
		);
	}

	return (
		<Hoverable
			style={[styles.hoverable, styles.container, containerStyle]}
			onPress={() => onPress?.(item)}
		>
			<Text style={[styles.title, tabStyle?.textStyle]}>{item.title}</Text>
		</Hoverable>
	);
};

export const activatedStyle: TabItemStyle = {
	style: { backgroundColor: '#0694D3' },
	textStyle: {
		color: 'white',
		fontWeight: '500',
	},
};

export const deactivatedStyle: TabItemStyle = {
	style: { backgroundColor: 'transparent' },
	textStyle: {
		color: '#566674',
		fontWeight: '400',
	},
};

export default TabItem;

const styles = StyleSheet.create({
	hoverable: {
		flex: 1,
	},
	container: {
		paddingVertical: 10,
		borderRadius: 8,
	},
	title: {
		textAlign: 'center',
		fontSize: 14,
	},
});
