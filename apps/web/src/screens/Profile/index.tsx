import { AnimateDirections, BindDirections, modalActions } from '@walless/app';
import { MainFeatures } from '@walless/app';
import { Stack } from '@walless/ui';

import Collectibles from './components/Collectibles';
import History from './components/History';
import TokenValue from './components/TokenValue';
import Widgets from './components/Widgets';
import SendTokenScreen from './modals/SendToken';

const ProfileScreen = () => {
	const handleSend = () => {
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

			<MainFeatures onSendPress={handleSend} />

			<Collectibles />

			<History />
		</Stack>
	);
};

export default ProfileScreen;
