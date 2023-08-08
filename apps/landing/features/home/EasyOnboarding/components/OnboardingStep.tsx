import type { FC } from 'react';
import { Image, Stack, Text } from '@walless/ui';

import type { OnboardingStepProps } from '../internal';

const OnboardingStep: FC<OnboardingStepProps> = ({
	title,
	description,
	imageUrl,
}) => {
	return (
		<Stack
			gap={24}
			alignItems="center"
			flexDirection="column-reverse"
			$gtMd={{ flexDirection: 'column' }}
		>
			<Image
				src={imageUrl}
				width={320}
				height={'auto'}
				aspectRatio={347 / 507}
				borderWidth={1}
				borderRadius={20}
				borderColor="#566674"
			/>
			<Stack>
				<Text
					fontSize={20}
					fontWeight="500"
					textAlign="center"
					marginBottom={8}
				>
					{title}
				</Text>
				<Text color="#566674" maxWidth={306} textAlign="center">
					{description}
				</Text>
			</Stack>
		</Stack>
	);
};

export default OnboardingStep;
