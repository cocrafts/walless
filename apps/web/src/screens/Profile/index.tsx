import { AnimateDirections, modalActions } from '@walless/app';
import { Stack } from '@walless/gui';

import Collectibles from './components/Collectibles';
import History from './components/History';
import MainFeatures from './components/MainFeatures';
import TokenValue from './components/TokenValue';
import Widgets from './components/Widgets';
import SendTokenScreen from './modals/SendToken';

const ProfileScreen = () => {
	const handlePressSendBtn = () => {
		modalActions.show({
			id: 'send-token',
			component: SendTokenScreen,
			animateDirection: AnimateDirections.Top,
		});
	};

	return (
		<Stack maxHeight="100vh" display="flex" alignItems="center" gap={28}>
			<Stack alignSelf="flex-end" margin={15}>
				<Widgets />
			</Stack>

			<TokenValue />

			<Stack marginTop={27} marginBottom={34}>
				<MainFeatures onPressSendBtn={handlePressSendBtn} />
			</Stack>

			<Collectibles />

			<History />
		</Stack>
	);
};

export default ProfileScreen;
