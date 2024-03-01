import type { FC } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Hoverable, Text } from '@walless/gui';

export interface TabItemStyle {
	containerStyle: ViewStyle;
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
	return (
		<Hoverable
			style={[styles.container, style?.containerStyle]}
			onPress={() => onPress?.(item)}
		>
			<Text style={[styles.title, style?.textStyle]}>{item.title}</Text>
		</Hoverable>
	);
};

export default TabItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 6,
		borderRadius: 8,
	},
	title: {
		textAlign: 'center',
		fontSize: 14,
	},
});
