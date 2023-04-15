import { AnimateDirections, BindDirections, modalActions } from '@walless/app';
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
			bindingDirection: BindDirections.InnerBottom,
			component: SendTokenScreen,
			animateDirection: AnimateDirections.Top,
		});
	};

	return (
		<Stack
			maxHeight="100vh"
			paddingHorizontal={14}
			paddingVertical={16}
			display="flex"
			alignItems="center"
			gap={36}
		>
			<Stack alignSelf="flex-end" marginBottom={-12}>
				<Widgets />
			</Stack>

			<TokenValue />

			<MainFeatures onPressSendBtn={handlePressSendBtn} />

			<Collectibles />

			<History />
		</Stack>
	);
};

export default ProfileScreen;
