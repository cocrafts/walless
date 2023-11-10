import { ProfileFeature } from '@walless/app/features/Profile';
import { router } from 'utils/routing';

export const ProfileScreen = () => {
	const handleSettingPress = () => {
		router.navigate('/setting');
	};

	return <ProfileFeature onSettingPress={handleSettingPress} />;
};

export default ProfileScreen;
