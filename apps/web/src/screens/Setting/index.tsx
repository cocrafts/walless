import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
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
		<View style={styles.container}>
			<Header profile={profile} />
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
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 14,
		paddingVertical: 28,
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
