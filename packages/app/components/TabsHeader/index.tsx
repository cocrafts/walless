import { FC } from 'react';
import { Stack, StackProps } from '@walless/gui';

import { TabAble } from './shared';
import TabItem from './TabItem';

type Props = StackProps & {
	items: TabAble[];
	activeItem: TabAble;
	onTabPress?: (item: TabAble) => void;
};

export const TabsHeader: FC<Props> = ({
	items,
	activeItem,
	onTabPress,
	...stackProps
}) => {
	return (
		<Stack
			horizontal
			backgroundColor="#202d38"
			borderRadius={10}
			padding={4}
			{...stackProps}
		>
			{items.map((item) => {
				const isActive = item.id === activeItem.id;
				const backgroundColor = isActive ? '#0694D3' : 'transparent';
				const color = isActive ? 'white' : '#566674';

				return (
					<TabItem
						key={item.id}
						item={item}
						backgroundColor={backgroundColor}
						color={color}
						onPress={onTabPress}
					/>
				);
			})}
		</Stack>
	);
};

export default TabsHeader;

export * from './shared';
