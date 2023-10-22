import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, View } from '@walless/gui';

import type { IndicatorOption } from './Slider';
import type { WalletProps } from './WalletCard';

interface Props {
	config: IndicatorOption;
}

interface IndicatorProps {
	cardList: WalletProps[];
}

const WalletCardIndicator: FC<Props> = ({ config }) => {
	const { cardList } = config.context as IndicatorProps;

	return (
		<View style={styles.container}>
			{cardList.map((card: WalletProps, index) => (
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
					<View
						style={{
							...styles.current,
							backgroundColor:
								index === config.currentActiveIndex ? '#0694D3' : '#242F38',
						}}
					/>
				</Hoverable>
			))}
		</View>
	);
};

export default WalletCardIndicator;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
	},
	current: {
		width: 40,
		height: 4,
		borderRadius: 4,
	},
});
