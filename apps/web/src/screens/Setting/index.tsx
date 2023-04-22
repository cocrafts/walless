import { Stack } from '@walless/ui';
import { appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';

import Delimiter from './components/Delimiter';
import FollowUs from './components/FollowUs';
import Header from './components/Header';
import HelpCenter from './components/HelpCenter';
import MyWallets from './components/MyWallets';

const SettingScreen = () => {
	const { profile } = useSnapshot(appState);

	return (
		<Stack paddingHorizontal={14} paddingVertical={28}>
			<Header profile={profile} />
			<Delimiter />
			<Stack gap={16}>
				<MyWallets />
				<HelpCenter />
				<FollowUs />
			</Stack>
		</Stack>
	);
};

export default SettingScreen;
