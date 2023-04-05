import { Stack } from '@walless/gui';

import Collectibles from './components/Collectibles';
import History from './components/History';
import MainFeatures from './components/MainFeatures';
import TokenValue from './components/TokenValue';
import Widgets from './components/Widgets';

const ProfileScreen = () => {
	return (
		<Stack maxHeight="100vh" display="flex" alignItems="center" gap={28}>
			<Stack alignSelf="flex-end" margin={15}>
				<Widgets />
			</Stack>

			<TokenValue />

			<Stack marginTop={27} marginBottom={34}>
				<MainFeatures />
			</Stack>

			<Collectibles />

			<History />
		</Stack>
	);
};

export default ProfileScreen;
