import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { appState } from '@walless/engine';
import { Text, View } from '@walless/gui';
import type { DashboardParamList } from 'utils';
import { useSnapshot } from 'valtio';

import AccountInfo from './components/AccountInfo';
import Delimiter from './components/Delimiter';
import FollowUs from './components/FollowUs';
import HelpCenter from './components/HelpCenter';
import LogOut from './components/LogOut';
import MyWallets from './components/MyWallets';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

export const SettingScreen: FC<Props> = () => {
	const { profile } = useSnapshot(appState);

	return (
		<View style={styles.container}>
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
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
		paddingTop: 16,
		paddingBottom: 36,
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
