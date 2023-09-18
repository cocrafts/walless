import type { FC } from 'react';
import { Hoverable } from '@walless/gui';
import { Stack } from '@walless/ui';

import type { BlogCardProps } from '../BlogCard';

import type { IndicatorOption } from './shared';

interface Props {
	config: IndicatorOption;
}

interface IndicatorProps {
	cardList: BlogCardProps[];
}

const Indicator: FC<Props> = ({ config }) => {
	const { cardList } = config.context as IndicatorProps;

	return (
		<Stack
			flexDirection="row"
			alignItems="center"
			justifyContent="center"
			gap={4}
		>
			{cardList.map((card: BlogCardProps, index) => (
				<Hoverable
					key={index}
					style={{
						height: 20,
						backgroundColor: 'transparent',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() =>
						config.setCurrentActiveIndex
							? config.setCurrentActiveIndex(index)
							: null
					}
				>
					<Stack
						backgroundColor={
							index === config.currentActiveIndex ? '#0694D3' : '#242F38'
						}
						width={40}
						height={4}
						borderRadius={4}
					/>
				</Hoverable>
			))}
		</Stack>
	);
};

export default Indicator;
