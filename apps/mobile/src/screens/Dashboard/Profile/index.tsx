import { ProfileFeature } from '@walless/app';
import { navigate } from 'utils/navigation';

export const ProfileScreen = () => {
	const handleSettingPress = () => {
		navigate('Dashboard', {
			screen: 'Profile',
			params: {
				screen: 'Setting',
			},
		});
	};

	const handleNavigateToHistory = () => {
		navigate('Dashboard', {
			screen: 'Profile',
			params: {
				screen: 'History',
			},
		});
	};

	return (
		<ProfileFeature
			onSettingPress={handleSettingPress}
			onNavigateToHistory={handleNavigateToHistory}
		/>
	);
};

export default ProfileScreen;
