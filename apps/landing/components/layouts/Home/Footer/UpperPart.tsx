import { Button, Image, Input, Stack, Text } from '@walless/gui';
import {
	Discord,
	Github,
	LinkedIn,
	Mail,
	Twitter,
	Youtube,
} from '@walless/icons';
import { imageSources } from 'components/layouts/shared';
import Link from 'next/link';

import SocialIcon from './SocialIcon';

const UpperPart = () => {
	const fontSize = 14;
	const largeFontSize = 20;

	return (
		<Stack
			width="100%"
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
				gap={28}
				$gtMd={{
					width: 'auto',
					minWidth: 600,
					paddingHorizontal: 0,
				}}
			>
				<Text fontWeight="600" fontSize={largeFontSize}>
					We don&apos;t want you miss latest{' '}
					<Link href="/">
						<Text color="#0694D3">updates</Text>
					</Link>
					!
				</Text>

				<Stack
					paddingVertical={8}
					paddingHorizontal={4}
					borderWidth={1}
					borderRadius={16}
					borderColor="#566674"
					flexDirection="row"
					width="100%"
					maxWidth={600}
				>
					<Input
						backgroundColor="transparent"
						flexGrow={1}
						placeholder="Enter your email"
						borderWidth={0}
					/>
					<Button borderRadius={12} width={180}>
						<Text fontWeight="600" fontSize={fontSize}>
							Count me in
						</Text>
					</Button>
				</Stack>

				<Stack
					flexDirection="row"
					justifyContent="center"
					gap={28}
					flexWrap="wrap"
				>
					<SocialIcon
						size={48}
						link="https://discord.gg/2bzf9qjuN3"
						icon={<Discord size={40} />}
					/>

					<SocialIcon
						size={48}
						link="https://discord.gg/2bzf9qjuN3"
						icon={<Twitter size={40} />}
					/>

					<SocialIcon
						size={48}
						link="https://discord.gg/2bzf9qjuN3"
						icon={<Github size={40} />}
					/>

					<SocialIcon
						size={48}
						link="https://discord.gg/2bzf9qjuN3"
						icon={<LinkedIn size={40} />}
					/>

					<SocialIcon
						size={48}
						link="https://discord.gg/2bzf9qjuN3"
						icon={<Youtube size={40} />}
					/>

					<SocialIcon
						size={48}
						link="https://discord.gg/2bzf9qjuN3"
						icon={<Mail size={40} />}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default UpperPart;
