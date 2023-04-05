import {
	ArrowBottomRight,
	ArrowTopRight,
	Cart,
	Stack,
	Swap,
} from '@walless/gui';

import FeatureButton from './FeatureButton';

const MainFeatures = () => {
	return (
		<Stack display="flex" flexDirection="row" gap={25}>
			<FeatureButton featureName="Send" onClick={() => console.log('Send')}>
				<ArrowTopRight size={24} />
			</FeatureButton>
			<FeatureButton
				featureName="Receive"
				onClick={() => console.log('Receive')}
			>
				<ArrowBottomRight size={24} />
			</FeatureButton>
			<FeatureButton featureName="Buy" onClick={() => console.log('Buy')}>
				<Cart size={24} />
			</FeatureButton>
			<FeatureButton featureName="Swap" onClick={() => console.log('Swap')}>
				<Swap size={24} />
			</FeatureButton>
		</Stack>
	);
};

export default MainFeatures;
