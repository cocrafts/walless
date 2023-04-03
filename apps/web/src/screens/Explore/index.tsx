import { Bell } from '@tamagui/lucide-icons';
import { Stack } from '@walless/gui';

import FeatureButton from './FeatureButton';

const ExploreScreen = () => {
	return (
		<Stack>
			<Stack>
				<FeatureButton
					icon={Bell}
					handleClick={() => console.log('Notification')}
				/>
			</Stack>
		</Stack>
	);
};

export default ExploreScreen;
