import { ProfileFeature } from '@walless/app/features/Profile';
import { router } from 'utils/routing';

export const ProfileScreen = () => {
	const handleNavigateToHistory = () => {
		router.navigate('/history');
	};

	const handleSettingPress = () => {
		router.navigate('/setting');
	};

	return (
		<ProfileFeature
			onNavigateToHistory={handleNavigateToHistory}
			onSettingPress={handleSettingPress}
		/>
	);
};

export default ProfileScreen;
