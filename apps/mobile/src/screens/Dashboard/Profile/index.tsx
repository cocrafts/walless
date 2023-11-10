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

	return <ProfileFeature onSettingPress={handleSettingPress} />;
};

export default ProfileScreen;
