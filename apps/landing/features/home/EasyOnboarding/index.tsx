import { Stack } from '@walless/ui';
import SectionTitle from 'components/SectionTitle';

import OnboardingContainer from './components/OnboardingContainer';
import type { OnboardingStepProps } from './internal';

const onboardingSteps: OnboardingStepProps[] = [
	{
		imageUrl: '/img/onboarding/1.png',
		title: '1. Login with social accounts',
		description: 'Wallet accounts are auto created across network',
	},
	{
		imageUrl: '/img/onboarding/2.png',
		title: '2. Pick your favorite layout',
		description: 'Browse a layout that you like',
	},
	{
		imageUrl: '/img/onboarding/3.png',
		title: '3. Have fun',
		description: 'Enjoy everything at one place',
	},
];

const EasyOnboarding = () => {
	return (
		<Stack
			marginVertical={120}
			gap={72}
			maxWidth={1200}
			marginHorizontal={'auto'}
		>
			<SectionTitle title="Onboard to Web3 as easy as 1-2-3" />
			<OnboardingContainer onboardingSteps={onboardingSteps} />
		</Stack>
	);
};

export default EasyOnboarding;
