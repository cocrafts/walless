import { StyleSheet } from 'react-native';
import { ProfileFeature } from '@walless/app';
import { Hoverable, View } from '@walless/gui';
import { Setting } from '@walless/icons';
import { router } from 'utils/routing';

export const ProfileScreen = () => {
	const handleNavigateToHistory = () => {
		router.navigate('/history');
	};

	const handleSettingPress = () => {
		router.navigate('/setting');
	};

	return (
		<View>
			<Hoverable style={styles.settingContainer} onPress={handleSettingPress}>
				<Setting size={16} />
			</Hoverable>
			<ProfileFeature onNavigateToHistory={handleNavigateToHistory} />
		</View>
	);
};

const styles = StyleSheet.create({
	settingContainer: {
		marginLeft: 'auto',
		marginRight: 14,
		marginTop: 14,
		backgroundColor: '#25313D',
		padding: 8,
		borderRadius: 100,
	},
});

export default ProfileScreen;
