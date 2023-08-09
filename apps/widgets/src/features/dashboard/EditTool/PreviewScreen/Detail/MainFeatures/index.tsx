import { View } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';

import FeatureButton from './FeatureButton';

const MainFeatures = () => {
	const iconSize = 18;
	return (
		<View horizontal>
			<FeatureButton title="Send">
				<ArrowTopRight size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Receive">
				<ArrowBottomRight size={iconSize} />
			</FeatureButton>
		</View>
	);
};

export default MainFeatures;
