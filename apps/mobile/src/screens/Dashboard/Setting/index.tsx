import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { appState } from '@walless/engine';
import { Text, View } from '@walless/gui';
import { LogOut } from '@walless/icons';
import type { DashboardParamList } from 'utils';
import { useSnapshot } from 'valtio';

import AccountInfo from './components/AccountInfo';
import Delimiter from './components/Delimiter';
import FollowUs from './components/FollowUs';
import HelpCenter from './components/HelpCenter';
import MyWallets from './components/MyWallets';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

export const SettingScreen: FC<Props> = () => {
	const { profile } = useSnapshot(appState);

	return (
		<View style={styles.container}>
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
