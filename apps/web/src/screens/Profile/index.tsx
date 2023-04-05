import { Stack } from '@walless/gui';

import Collectibles from './components/Collectibles';
import MainFeatures from './components/MainFeatures';
import TokenValue from './components/TokenValue';
import Widgets from './components/Widgets';

const ProfileScreen = () => {
	return (
		<Stack maxHeight={250} display="flex" alignItems="center">
			<Stack alignSelf="flex-end" margin={15}>
				<Widgets />
			</Stack>

			<TokenValue />

			<Stack marginTop={27} marginBottom={34}>
				<MainFeatures />
			</Stack>

			<Collectibles />
		</Stack>
	);
};

export default ProfileScreen;
