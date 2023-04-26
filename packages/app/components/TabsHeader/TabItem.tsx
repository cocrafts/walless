import { FC } from 'react';
import { Button, Text } from '@walless/ui';

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
		<Button
			flex={1}
			cursor="pointer"
			userSelect="none"
			backgroundColor={backgroundColor}
			paddingVertical={6}
			borderRadius={8}
			hoverStyle={{ opacity: 0.8 }}
			pressStyle={{ opacity: 0.6 }}
			onPress={() => onPress?.(item)}
		>
			<Text color={color} textAlign="center" fontSize={14}>
				{item.title}
			</Text>
		</Button>
	);
};

export default TabItem;
