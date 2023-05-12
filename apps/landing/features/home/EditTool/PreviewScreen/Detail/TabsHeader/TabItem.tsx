import { type FC } from 'react';
import { Button, Text } from '@walless/ui';

import { TabAble } from '../shared';

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
		<Button
			width="100%"
			flex={1}
			backgroundColor={backgroundColor}
			borderRadius={8}
			paddingVertical={6}
			onPress={() => onPress?.(item)}
		>
			<Text fontSize={14} fontWeight="500" color={color}>
				{item.title}
			</Text>
		</Button>
	);
};

export default TabItem;
