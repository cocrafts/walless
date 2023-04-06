import { FC, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Anchor, Button, Image, Stack, Text } from '@walless/gui';
import { ContainerStack } from 'components/styled';
import Link from 'next/link';

export const HeadingSection: FC = () => {
	return (
		<Stack backgroundColor="red">
			<ContainerStack backgroundColor="#19232C">
				<Stack horizontal alignItems={'center'} height={80}>
					<Stack horizontal alignItems={'center'}>
						<Image
							defaultSource={imageSources.wallessIcon}
							src={imageSources.wallessIcon}
							height={25}
							width={50}
							resizeMode="contain"
						/>
						<Image
							defaultSource={imageSources.wallessText}
							src={imageSources.wallessText}
							height={18}
							width={180}
							resizeMode="contain"
						/>
					</Stack>
					<Stack horizontal>
						<Link href={'/'}>Getting started</Link>
						<Link href={'/'}>For Developers</Link>
						<Link href={'/'}>News</Link>
						<Link href={'/'}></Link>
					</Stack>
				</Stack>
			</ContainerStack>
		</Stack>
	);
};

const imageSources = {
	wallessIcon: {
		uri: '/img/walless-icon.png',
	},
	wallessText: {
		uri: '/img/walless-text.png',
	},
};

export default HeadingSection;
