import { FC, useState } from 'react';
import { LayoutChangeEvent, ViewStyle } from 'react-native';
import { Button, Image, Stack, Text } from '@walless/gui';
import {
	ParticalProps,
	Walless01,
	Walless02,
	Walless03,
	WallessLight01,
	WallessLight02,
} from 'components/icons/Walless';
import { ContainerStack } from 'components/styled';

const FirstScreen = () => {
	const [height, setHeight] = useState(0);

	const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setHeight(nativeEvent.layout.height);
	};
	return (
		<Stack backgroundColor="#19232C" height={height} opacity={height ? 1 : 0}>
			<ContainerStack fullscreen>
				<Stack fullscreen>
					{particals.map(({ Component, style, size }, index) => {
						return <Component key={index} width={size} style={style} />;
					})}
				</Stack>
				<Stack
					horizontal
					flexWrap="wrap"
					paddingTop={100}
					paddingBottom={300}
					paddingHorizontal={180}
					onLayout={onLayout}
					justifyContent="space-between"
					gap={80}
				>
					<Stack
						flex={1}
						minWidth={400}
						justifyContent="center"
						paddingVertical={32}
					>
						<Stack horizontal justifyContent="space-between">
							<Text fontSize={60} fontWeight={600} width={500}>
								Walless, <br /> the first Web3 sandbox-wallet
							</Text>
							<Stack width={200}>
								<Stack
									height={15}
									width={15}
									backgroundColor={'#566674'}
									marginBottom={10}
								></Stack>
								<Text fontSize={18} lineHeight={35} fontWeight={500}>
									Custom layout
								</Text>
								<Text fontSize={18} lineHeight={35} fontWeight={500}>
									No seed phrase
								</Text>
								<Text fontSize={18} lineHeight={35} fontWeight={500}>
									Off-Chain Multi-Sigs
								</Text>
								<Text fontSize={18} lineHeight={35} fontWeight={500}>
									Unified UI
								</Text>
								<Text fontSize={18} lineHeight={35} fontWeight={500}>
									Multi-chain
								</Text>
							</Stack>
						</Stack>
						<Image
							defaultSource={imageSources.homeLine}
							src={imageSources.homeLine}
							height={80}
							left={0}
							right={0}
							resizeMode="contain"
						/>
						<Stack horizontal>
							<Stack flex={1}>
								<Text
									width={360}
									fontWeight={400}
									fontSize={16}
									lineHeight={25}
								>
									Unveiling an entirely new way to think about wallet, Social
									sign in - Custom layout & skin
								</Text>
							</Stack>
							<Stack horizontal alignItems="flex-start" gap={20}>
								<Button
									fontSize={16}
									fontWeight={400}
									paddingHorizontal={50}
									paddingVertical={14}
									borderRadius={15}
									backgroundColor="#0694D3"
									title="Main CTA"
								/>
								<Button
									fontSize={16}
									fontWeight={400}
									paddingHorizontal={50}
									paddingVertical={14}
									borderRadius={15}
									backgroundColor="none"
									borderWidth={1}
									borderColor={'#fff'}
									title="Sub CTA"
								/>
							</Stack>
						</Stack>
					</Stack>
					<Stack>
						<Image
							defaultSource={imageSources.extenstionImage}
							src={imageSources.extenstionImage}
							width={342}
							height={500}
						/>
					</Stack>
				</Stack>
			</ContainerStack>
		</Stack>
	);
};

export default FirstScreen;

const imageSources = {
	homeLine: {
		uri: '/img/home-line.png',
	},
	extenstionImage: {
		uri: '/img/extension-image.png',
	},
};

interface BackgroundIconPartical {
	Component: FC<ParticalProps>;
	style: ViewStyle;
	size: number;
}

const particals: BackgroundIconPartical[] = [
	{
		Component: Walless02,
		style: {
			position: 'absolute',
			left: -30,
			bottom: 100,
			opacity: 0.4,
		},
		size: 1000,
	},
	// {
	// 	Component: Walless01,
	// 	style: {
	// 		position: 'absolute',
	// 		top: -1000,
	// 		left: -200,
	// 		opacity: 1,
	// 	},
	// 	size: 800,
	// },
	{
		Component: Walless03,
		style: {
			position: 'absolute',
			top: -50,
			right: 56,
			opacity: 0.5,
		},
		size: 760,
	},
	{
		Component: Walless02,
		style: {
			position: 'absolute',
			top: 0,
			right: -30,
			opacity: 0.2,
		},
		size: 500,
	},
	{
		Component: WallessLight01,
		style: {
			position: 'absolute',
			top: -70,
			right: -300,
			opacity: 1,
		},
		size: 800,
	},
	{
		Component: WallessLight02,
		style: {
			position: 'absolute',
			top: 30,
			right: -200,
			opacity: 1,
		},
		size: 100,
	},
];
