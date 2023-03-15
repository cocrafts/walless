import { FC } from 'react';
import { ImageSourcePropType, Linking, ScrollView } from 'react-native';
import { Hyperlink } from '@metacraft/ui';
import { Button, Image, Text, TouchableOpacity, View } from '@walless/ui';
import ExtensionIcon from 'components/ExtensionIcon';
import { detectMobile } from 'utils/helper';

interface ExtensionConfig {
	icon: ImageSourcePropType;
	title: string;
	download: string;
}

const makeExtensionConfig = (name: string) => ({
	icon: { uri: `/img/${name.toLowerCase()}.png` },
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

export const HomeScreen: FC = () => {
	const onIconPress = ({ download }: ExtensionConfig) => {
		console.log('hmm');
		Linking.openURL(download);
	};

	const isMobile = detectMobile();

	return (
		<View className="flex-1 items-center bg-[color:#00121E]">
			<ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
				<View
					className={`${
						isMobile ? 'flex-none' : 'flex-1'
					} max-w-[1060px] w-full py-5 px-2`}
				>
					<View className="flex-row justify-between items-center">
						<Image
							className="w-[100px] aspect-[45/7]"
							source={{ uri: '/img/icon-horizon.png' }}
						/>
						<View className="flex-row gap-2">
							<TouchableOpacity
								className="hover:opacity-80"
								onPress={() =>
									Linking.openURL('https://twitter.com/walless_wallet')
								}
							>
								<Image
									className="w-5 aspect-square"
									source={{ uri: '/img/social-icon/twitter.png' }}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								className="hover:opacity-80"
								onPress={() =>
									Linking.openURL('https://github.com/cocrafts/walless')
								}
							>
								<Image
									className="w-5 aspect-square"
									source={{ uri: '/img/social-icon/git.png' }}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View className="flex-1 items-center mt-10">
						<Image className="w-48 h-48" source={{ uri: '/img/icon-lg.png' }} />
						<Text className="mt-3 text-lg font-semibold bg-clip-text [color:transparent] bg-gradient-to-r from-[color:#1BA0DA] to-[color:#8AC3BF]">
							Onboard the next billion users on Web3
						</Text>
						<Text className=" text-5xl font-bold text-center leading-snug max-w-3xl">
							Simplify your Web3 Journey with Walless
						</Text>
						<View className="items-center">
							{/*<Button*/}
							{/*	className="mt-5 bg-[color:#19A3E1] hover:opacity-80 w-52 h-10 justify-center items-center rounded-md"*/}
							{/*	title="Demo"*/}
							{/*/>*/}
							<Button
								className="mt-5 hover:opacity-80"
								title="Get on Waitlist"
								titleClass="font-light text-xs text-white/60"
								onPress={() =>
									Linking.openURL('https://forms.gle/hqFXYLECXyq8R2W66')
								}
							/>
						</View>
						<Text className="font-light text-xs text-white/60 mt-28">
							For Developet test only!
						</Text>
						<View className="flex-row flex-wrap justify-center">
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
						</View>
					</View>
					<View>
						<Text className="text-base text-center ">
							<Text>Created with ❤️ by </Text>
							<Hyperlink href="https://stormgate.io" title="Stormgate.io" />
						</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default HomeScreen;
