import type { FC } from 'react';
import { Button, Text } from '@walless/gui';

import type { TabAble } from '../shared';

interface Props {
	item: TabAble;
	backgroundColor: string;
	color: string;
	onPress?: (item: TabAble) => void;
}

export const TabItem: FC<Props> = ({ item, onPress }) => {
	return (
		<Button onPress={() => onPress?.(item)}>
			<Text>{item.title}</Text>
		</Button>
	);
};

export default TabItem;
