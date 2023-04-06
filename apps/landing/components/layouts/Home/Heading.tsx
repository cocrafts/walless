import { FC, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Anchor, Button, Image, Stack, Text } from '@walless/gui';
import { ContainerStack } from 'components/styled';
import Link from 'next/link';

export const headingHeight = 80;

export const HeadingSection: FC = () => {
	return (
		<Stack
			position="absolute"
			top={0}
			right={0}
			left={0}
			backgroundColor="#19232C"
		>
			<ContainerStack backgroundColor="#19232C">
				<Stack
					horizontal
					alignItems={'center'}
					height={headingHeight}
					justifyContent="space-between"
				>
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
					<Stack
						horizontal
						style={{ fontWeight: 500, fontSize: 16, lineHeight: 21 }}
						width={600}
						justifyContent="space-between"
					>
						<Link href={'/'}>
							<Text>Getting started</Text>
						</Link>
						<Link href={'/'}>
							<Text color={'#566674'}>For Developers</Text>
						</Link>
						<Link href={'/'}>
							<Text color={'#566674'}>News</Text>
						</Link>
						<Link href={'/'}>
							<Text color={'#566674'}>Resources</Text>
						</Link>
					</Stack>
					<Stack width={250} alignItems="flex-end">
						<Button
							fontSize={16}
							fontWeight={400}
							paddingHorizontal={50}
							paddingVertical={14}
							borderRadius={15}
							backgroundColor="#0694D3"
							title="Launch"
						/>
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
