import { Stack, Text } from '@walless/ui';
import { appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';

import {
	Delimiter,
	FollowUs,
	Header,
	HelpCenter,
	LogOut,
	MyWallets,
} from './components';

const SettingScreen = () => {
	const { profile } = useSnapshot(appState);

	return (
		<Stack paddingHorizontal={14} paddingVertical={28}>
			<Header profile={profile} />
			<Delimiter />
			<Stack gap={16}>
				<MyWallets />
				<Stack>
					<Text color="#566674" fontSize={14} fontWeight="400">
						Settings
					</Text>
					<Stack gap={8}>
						<HelpCenter />
						<LogOut />
					</Stack>
				</Stack>
				<FollowUs />
			</Stack>
		</Stack>
	);
};

export default SettingScreen;
