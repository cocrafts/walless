import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

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
		<Stack
			flex={1}
			cursor="pointer"
			userSelect="none"
			backgroundColor={backgroundColor}
			paddingVertical={6}
			borderRadius={8}
			hoverStyle={{ opacity: 0.8 }}
			pressStyle={{ opacity: 0.6 }}
			onPress={onPress}
		>
			<Text color={color} textAlign="center" fontSize={14}>
				{item.title}
			</Text>
		</Stack>
	);
};

export default TabItem;
