import { navigate } from 'utils/navigation';

export const handleGoBackFromReferralScreen = () => {
	navigate('Dashboard', {
		screen: 'Explore',
		params: {
			screen: 'Profile',
			params: {
				screen: 'Setting',
			},
		},
	});
};
