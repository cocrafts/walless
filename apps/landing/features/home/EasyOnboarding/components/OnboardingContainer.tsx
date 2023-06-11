import { type FC } from 'react';
import { Stack } from '@walless/ui';

import { type OnboardingStepProps } from '../internal';

import OnboardingStep from './OnboardingStep';

interface Props {
	onboardingSteps: OnboardingStepProps[];
}

const OnboardingContainer: FC<Props> = ({ onboardingSteps }) => {
	return (
		<Stack
			justifyContent="center"
			gap={48}
			$gtLg={{
				flexDirection: 'row',
				gap: 24,
			}}
		>
			{onboardingSteps.map((step, index) => (
				<>
					{index > 0 && (
						<Stack
							marginTop={256}
							width={52}
							height={1}
							backgroundColor="#D7E0EA"
							display="none"
							$gtLg={{
								display: 'block',
							}}
						/>
					)}
					<OnboardingStep key={index} {...step} />
				</>
			))}
		</Stack>
	);
};

export default OnboardingContainer;
