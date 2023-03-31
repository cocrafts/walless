import { ReactElement } from 'react';
import { Anchor, Image, Stack, Text } from '@walless/wui';

import ExtensionIcon from '../components/ExtensionIcon';
import HomeLayout from '../components/layouts/Home';

interface ExtensionConfig {
	icon: string;
	title: string;
	download: string;
}

export const IndexPage = () => {
	const onIconPress = (item: ExtensionConfig) => {
		console.log(item);
	};

	return (
		<Stack alignItems="center">
			<Image
				src={logoUri}
				defaultSource={{ uri: logoUri }}
				width={logoSize}
				height={logoSize}
				marginTop={80}
			/>
			<Anchor
				fontSize={14}
				fontWeight="300"
				color="rgba(255, 255, 255, 0.6)"
				href="https://forms.gle/hqFXYLECXyq8R2W66"
				target="_blank"
			>
				Get on waiting list
			</Anchor>
			<Stack flexWrap="wrap" justifyContent="center">
				{extensionList.map((item) => {
					return (
						<ExtensionIcon
							key={item.download}
							iconSrc={item.icon}
							title={item.title}
							onPress={() => onIconPress(item)}
						/>
					);
				})}
			</Stack>
			<Text color="white" marginTop={54}>
				<Text>Created with ❤️ by </Text>
				<Anchor color="rgb(44, 135, 155)" href="https://stormgate.io">
					{' '}
					Stormgate.io
				</Anchor>
			</Text>
		</Stack>
	);
};

IndexPage.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default IndexPage;

const logoSize = 140;
const logoUri = '/img/icon-lg.png';
const makeExtensionConfig = (name: string) => ({
	icon: `/img/${name.toLowerCase()}.png`,
	title: name,
	download: `/${name.toLowerCase()}.zip`,
});

const extensionList: ExtensionConfig[] = [
	makeExtensionConfig('Chrome'),
	makeExtensionConfig('Firefox'),
	makeExtensionConfig('Brave'),
	makeExtensionConfig('Edge'),
	makeExtensionConfig('Opera'),
];
