import { Stack } from '@walless/ui';

import Delimiter from './components/Delimiter';
import FollowUs from './components/FollowUs';
import Header from './components/Header';
import HelpCenter from './components/HelpCenter';
import MyWallets from './components/MyWallets';

const SettingScreen = () => {
	return (
		<Stack paddingHorizontal={14} paddingVertical={28}>
			<Header />
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
