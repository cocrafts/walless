import { Stack, Text } from '@walless/gui';

import FeatureWidgets from './FeatureWidgets';

const ProfileScreen = () => {
	return (
		<Stack display="flex">
			<Stack alignSelf="flex-end" margin={15}>
				<FeatureWidgets />
			</Stack>

			<Stack>
				<Text>Token value</Text>
			</Stack>
		</Stack>
	);
};

export default ProfileScreen;
