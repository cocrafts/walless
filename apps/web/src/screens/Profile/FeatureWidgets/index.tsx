import { Bell, IdCard, Setting, Stack } from '@walless/gui';

import FeatureButton from './FeatureButton';

const FeatureWidgets = () => {
	return (
		<Stack display="flex" flexDirection="row" gap={10}>
			<FeatureButton onClick={() => console.log('Clicked')}>
				<IdCard size={14} color="white" />
			</FeatureButton>
			<FeatureButton onClick={() => console.log('Clicked')}>
				<Bell size={14} color="white" />
			</FeatureButton>
			<FeatureButton onClick={() => console.log('Clicked')}>
				<Setting size={14} color="white" />
			</FeatureButton>
		</Stack>
	);
};

export default FeatureWidgets;
