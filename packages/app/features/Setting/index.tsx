import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appState } from '@walless/engine';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import AccountInfo from './components/AccountInfo';
import Delimiter from './components/Delimiter';
import FollowUs from './components/FollowUs';
import HelpCenter from './components/HelpCenter';
import LogOut from './components/LogOut';
import MyWallets from './components/MyWallets';
import PageTitle from './components/PageTitle';

const SettingFeature = () => {
	const { profile } = useSnapshot(appState);
	const insets = useSafeAreaInsets();

	return (
		<ScrollView style={[styles.container, { marginTop: insets.top }]}>
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
		</ScrollView>
	);
};

export default SettingFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
		paddingBottom: 28,
	},
	contentContainer: {
		flex: 1,
		paddingTop: 18,
	},
	text: {
		color: '#566674',
		marginBottom: 4,
	},
	settingContainer: {
		gap: 8,
	},
	innerContainer: {
		gap: 16,
	},
});
