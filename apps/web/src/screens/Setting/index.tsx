import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { appState } from 'state/app';
import { useSnapshot } from 'utils/hooks';

import AccountInfo from './components/AccountInfo';
import Delimiter from './components/Delimiter';
import FollowUs from './components/FollowUs';
import HelpCenter from './components/HelpCenter';
import LogOut from './components/LogOut';
import MyWallets from './components/MyWallets';
import PageTitle from './components/PageTitle';

const SettingScreen = () => {
	const { profile } = useSnapshot(appState);

	return (
		<View style={styles.container}>
			<PageTitle />
			<View style={styles.contentContainer}>
				<AccountInfo profile={profile} />
				<Delimiter />
				<View style={styles.innerContainer}>
					<MyWallets />
					<View>
						<Text style={styles.text}>Settings</Text>
						<View style={styles.settingContainer}>
							<HelpCenter />
							<LogOut />
						</View>
					</View>
					<FollowUs />
				</View>
			</View>
		</View>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
		paddingVertical: 28,
	},
	contentContainer: {
		flex: 1,
		paddingTop: 18,
	},
	text: {
		color: '#566674',
	},
	settingContainer: {
		gap: 8,
	},
	innerContainer: {
		gap: 16,
	},
});
