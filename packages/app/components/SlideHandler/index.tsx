import { FC } from 'react';
import { Stack, StackProps } from '@walless/ui';

export interface SlideAble {
	id?: string;
}

type Props = StackProps & {
	items: SlideAble[];
	activeItem: SlideAble;
	itemGap?: number;
	indicatorWidth?: number;
	indicatorHeight?: number;
};

export const SlideHandler: FC<Props> = ({
	items,
	activeItem,
	itemGap = 12,
	indicatorWidth = 45,
	indicatorHeight = 6,
	...stackProps
}) => {
	return (
		<Stack horizontal gap={itemGap} {...stackProps}>
			{items.map((item) => {
				const isActive = item.id === activeItem.id;
				const backgroundColor = isActive ? '#0694D3' : '#202D38';

				return (
					<Stack
						key={item.id}
						cursor="pointer"
						backgroundColor={backgroundColor}
						width={indicatorWidth}
						height={indicatorHeight}
						borderRadius={indicatorHeight / 2}
						hoverStyle={{ opacity: 0.8 }}
						pressStyle={{ opacity: 0.7 }}
					/>
				);
			})}
		</Stack>
	);
};

export default SlideHandler;
