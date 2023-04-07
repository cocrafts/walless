import { FC } from 'react';
import { Button, Image, Stack } from '@walless/gui';
import Anchor from 'components/Anchor';
import { ContainerStack } from 'components/styled';

export const headingHeight = 64;

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
				<Stack horizontal height={headingHeight} alignItems="center">
					<Stack horizontal alignItems="center">
						<Image
							src={imageSources.wallessIcon}
							defaultSource={imageSources.wallessIcon}
							height={25}
							width={50}
							resizeMode="contain"
						/>
						<Image
							defaultSource={imageSources.wallessText}
							src={imageSources.wallessText}
							height={18}
							width={100}
							marginLeft={12}
							resizeMode="contain"
						/>
					</Stack>
					<Stack horizontal flex={1} paddingLeft={12}>
						{links.map(({ title, href }, index) => {
							return (
								<Anchor
									key={index}
									href={href}
									marginHorizontal={12}
									fontSize={16}
								>
									{title}
								</Anchor>
							);
						})}
					</Stack>
					<Stack horizontal>
						<Button fontSize={16} title="Launch" />
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

const links = [
	{
		title: 'Getting started',
		href: '/',
	},
	{
		title: 'For developers',
		href: '/',
	},
	{
		title: 'News',
		href: '/',
	},
	{
		title: 'Resources',
		href: '/',
	},
];
