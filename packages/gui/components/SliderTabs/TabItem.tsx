import type { FC } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Hoverable, Text } from '@walless/gui';

export interface TabContainerStyle {
	style: ViewStyle;
	linearGradient?: {
		isHorizontal: boolean;
		colors: string[];
	};
}

export interface TabItemStyle {
	containerStyle: TabContainerStyle;
	textStyle: TextStyle;
}

export interface TabAble {
	id: string;
	title: string;
}

interface Props {
	item: TabAble;
	style?: TabItemStyle;
	onPress?: (item: TabAble) => void;
}

export const TabItem: FC<Props> = ({ item, style, onPress }) => {
	if (style?.containerStyle.linearGradient) {
		const isHorizontal = style.containerStyle.linearGradient.isHorizontal;

		return (
			<Hoverable onPress={() => onPress?.(item)}>
				<LinearGradient
					style={[styles.container, style?.containerStyle.style]}
					colors={style.containerStyle.linearGradient.colors}
					start={{ x: 0, y: 0 }}
					end={{
						x: isHorizontal ? 1 : 0,
						y: isHorizontal ? 0 : 1,
					}}
				>
					<Text style={[styles.title, style?.textStyle]}>{item.title}</Text>
				</LinearGradient>
			</Hoverable>
		);
	}

	return (
		<Hoverable
			style={[styles.container, style?.containerStyle.style]}
			onPress={() => onPress?.(item)}
		>
			<Text style={[styles.title, style?.textStyle]}>{item.title}</Text>
		</Hoverable>
	);
};

export const activatedStyle: TabItemStyle = {
	containerStyle: {
		style: { backgroundColor: '#0694D3' },
	},
	textStyle: {
		color: 'white',
		fontWeight: '500',
	},
};

export const deactivatedStyle: TabItemStyle = {
	containerStyle: {
		style: { backgroundColor: 'transparent' },
	},
	textStyle: {
		color: '#566674',
		fontWeight: '400',
	},
};

export default TabItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 8,
	},
	title: {
		textAlign: 'center',
		fontSize: 14,
	},
});
