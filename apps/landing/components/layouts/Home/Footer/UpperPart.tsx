import { Image, Stack, Text } from '@walless/ui';
import { imageSources } from 'components/layouts/shared';
import { ContainerStack } from 'components/styled';

import CountMeIn from './CountMeIn';
import SocialIcons from './SocialIcons';

const UpperPart = () => {
	const fontSize = 14;

	return (
		<ContainerStack
			alignItems="center"
			gap={36}
			flexDirection="column-reverse"
			$gtMd={{
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Stack alignItems="center" gap={12}>
				<Image
					src={imageSources.wallessIcon}
					defaultSource={imageSources.wallessIcon}
					height={60}
					width={120}
					resizeMode="contain"
				/>
				<Image
					defaultSource={imageSources.wallessText}
					src={imageSources.wallessText}
					height={18}
					width={120}
					resizeMode="contain"
				/>

				<Text color="#566674" fontSize={fontSize}>
					Built by Stormgate.io 💙
				</Text>
			</Stack>

			<Stack
				width="100%"
				alignItems="center"
				paddingHorizontal={16}
				gap={36}
				$gtMd={{
					width: 'auto',
					paddingHorizontal: 0,
					alignItems: 'flex-end',
				}}
			>
				<CountMeIn />
				<SocialIcons />
			</Stack>
		</ContainerStack>
	);
};

export default UpperPart;
