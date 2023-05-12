import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';
import { Stack } from '@walless/ui';

import FeatureButton from './FeatureButton';

const MainFeatures = () => {
	const iconSize = 18;
	return (
		<Stack flexDirection="row" gap={18}>
			<FeatureButton title="Send">
				<ArrowTopRight size={iconSize} />
			</FeatureButton>
			<FeatureButton title="Receive">
				<ArrowBottomRight size={iconSize} />
			</FeatureButton>
		</Stack>
	);
};

export default MainFeatures;
