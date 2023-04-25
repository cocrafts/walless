import { FC } from 'react';
import { Hoverable } from '@walless/gui';
import { Stack } from '@walless/ui';

import { IndicatorOption } from './Slider';
import { WalletProps } from './WalletCard';

interface Props {
	config: IndicatorOption;
}

interface IndicatorProps {
	cardList: WalletProps[];
}

const WalletCardIndicator: FC<Props> = ({ config }) => {
	const { cardList } = config.context as IndicatorProps;
	const buttonStyle = {
		width: 40,
		height: 4,
		borderRadius: 4,
	};

	return (
		<Stack
			flexDirection="row"
			alignItems="center"
			justifyContent="center"
			gap={4}
		>
			{cardList.map((card: WalletProps, index) => (
				<Hoverable
					key={index}
					style={{
						...buttonStyle,
						backgroundColor:
							index === config.currentActiveIndex ? '#0694D3' : '#242F38',
					}}
					onPress={() =>
						config.setCurrentActiveIndex
							? config.setCurrentActiveIndex(index)
							: null
					}
				/>
			))}
		</Stack>
	);
};

export default WalletCardIndicator;
