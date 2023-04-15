import { useState } from 'react';
import { Button, Image, Input, Stack, Text } from '@walless/gui';
import { imageSources } from 'components/layouts/shared';
import { ContainerStack } from 'components/styled';
import Link from 'next/link';

import SocialIcons from './SocialIcons';

const UpperPart = () => {
	const [isSignedUp, setIsSignedUp] = useState(false);

	const fontSize = 14;
	const largeFontSize = 20;

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
				gap={28}
				$gtMd={{
					width: 'auto',
					paddingHorizontal: 0,
					alignItems: 'flex-end',
				}}
			>
				<Text fontWeight="600" fontSize={largeFontSize}>
					We don&apos;t want you miss latest{' '}
					<Link href="/">
						<Text color="#0694D3">updates</Text>
					</Link>
					!
				</Text>

				{isSignedUp ? (
					<Text
						maxWidth={420}
						fontSize={fontSize}
						lineHeight={fontSize * 1.5}
						color="#566674"
						textAlign="center"
					>
						Thanks for signing up. We&apos;ll keep you posted with Walless
						latest updates and exclusive perks.
					</Text>
				) : (
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
						<Button
							borderRadius={12}
							width={180}
							onPress={() => setIsSignedUp(true)}
						>
							<Text fontWeight="600" fontSize={fontSize}>
								Count me in
							</Text>
						</Button>
					</Stack>
				)}

				<SocialIcons />
			</Stack>
		</ContainerStack>
	);
};

export default UpperPart;
