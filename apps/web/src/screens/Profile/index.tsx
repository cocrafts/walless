import { Stack } from '@walless/gui';

import Collectibles from './Collectibles';
import MainFeatures from './MainFeatures';
import TokenValue from './TokenValue';
import Widgets from './Widgets';

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
