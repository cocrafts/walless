import { FC } from 'react';
import { Stack } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight, Cart, Swap } from '@walless/icons';

import FeatureButton from './FeatureButton';

interface Props {
	onPressSendBtn: () => void;
}

const MainFeatures: FC<Props> = ({ onPressSendBtn }) => {
	return (
		<Stack display="flex" flexDirection="row" gap={25}>
			<FeatureButton featureName="Send" onPress={onPressSendBtn}>
				<ArrowTopRight size={24} />
			</FeatureButton>
			<FeatureButton
				featureName="Receive"
				onPress={() => console.log('Receive')}
			>
				<ArrowBottomRight size={24} />
			</FeatureButton>
			<FeatureButton featureName="Buy" onPress={() => console.log('Buy')}>
				<Cart size={24} />
			</FeatureButton>
			<FeatureButton featureName="Swap" onPress={() => console.log('Swap')}>
				<Swap size={24} />
			</FeatureButton>
		</Stack>
	);
};

export default MainFeatures;
