import type { FC } from 'react';
import type { TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Hoverable, Text } from '@walless/gui';

import type { TabAble } from './shared';

interface Props {
	item: TabAble;
	backgroundColor: string;
	color: string;
	fontWeight: TextStyle['fontWeight'];
	onPress?: (item: TabAble) => void;
}

export const TabItem: FC<Props> = ({
	item,
	backgroundColor = 'transparent',
	color = 'white',
	fontWeight,
	onPress,
}) => {
	return (
		<Hoverable
			style={[styles.container, { backgroundColor }]}
			onPress={() => onPress?.(item)}
		>
			<Text style={[styles.title, { color, fontWeight }]}>{item.title}</Text>
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
