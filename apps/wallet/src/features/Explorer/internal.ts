import { navigate } from 'utils/navigation';

export const missions = [
	{
		title: 'Earn Walless Points',
		point: 100,
		buttonText: 'Earn',
		onPress: () => {
			navigate('Dashboard', {
				screen: 'Explore',
				params: {
					screen: 'Loyalty',
				},
			});
		},
	},
	{
		title: 'Refer your friends',
		point: 100,
		buttonText: 'Refer',
		onPress: () => {
			navigate('Dashboard', {
				screen: 'Setting',
				params: {
					screen: 'Referral',
				},
			});
		},
	},
	{
		title: 'Play & Earn $SUI, $FUD, $SCB',
		point: 100,
		buttonText: 'Play',
		onPress: () => {
			navigate('Dashboard', {
				screen: 'Explore',
				params: {
					screen: 'Widget',
					params: { id: 'pixeverse' },
				},
			});
		},
	},
	{
		title: 'Follow X',
		point: 100,
		buttonText: 'Follow',
		url: 'https://x.com/intent/follow?screen_name=walless_wallet',
	},
];
