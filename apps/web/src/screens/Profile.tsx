import { ProfileFeature } from '@walless/app/features/Profile';
import { router } from 'utils/routing';

export const ProfileScreen = () => {
	const handleNavigateToHistory = () => {
		router.navigate('/history');
	};
	return <ProfileFeature onNavigateToHistory={handleNavigateToHistory} />;
};

export default ProfileScreen;
