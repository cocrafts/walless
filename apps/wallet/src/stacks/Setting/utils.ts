import { navigate } from 'utils/navigation';

export const handleGoBackFromReferralScreen = () => {
	navigate('Dashboard', {
		screen: 'Setting',
		params: {
			screen: 'Default',
		},
	});
};
