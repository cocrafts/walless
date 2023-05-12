import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text } from '@walless/gui';

import { TabAble } from './shared';

interface Props {
	item: TabAble;
	backgroundColor: string;
	color: string;
	onPress?: (item: TabAble) => void;
}

export const TabItem: FC<Props> = ({
	item,
	backgroundColor = 'transparent',
	color = 'white',
	onPress,
}) => {
	return (
		<Hoverable
			style={[styles.container, { backgroundColor }]}
			onPress={() => onPress?.(item)}
		>
			<Text style={[styles.title, { color }]}>{item.title}</Text>
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
		fontWeight: '600',
	},
});
