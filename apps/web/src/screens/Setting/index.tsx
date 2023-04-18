import { Stack } from '@walless/ui';

import Delimiter from './components/Delimiter';
import Header from './components/Header';
import MyWallets from './components/MyWallets';

const SettingScreen = () => {
	return (
		<Stack paddingHorizontal={14} paddingVertical={28}>
			<Header />
			<Delimiter />
			<MyWallets />
		</Stack>
	);
};

export default SettingScreen;
