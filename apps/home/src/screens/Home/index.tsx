import { FC } from 'react';
import { ImageSourcePropType, Linking } from 'react-native';
import { Hyperlink } from '@metacraft/ui';
import { Text, View } from '@walless/ui';
import ExtensionIcon from 'components/ExtensionIcon';

interface ExtensionConfig {
	icon: ImageSourcePropType;
	title: string;
	download: string;
}

const extensionList: ExtensionConfig[] = [
	{
		icon: { uri: '/img/chrome.png' },
		title: 'Chrome',
		download: '/chrome.zip',
	},
	{
		icon: { uri: '/img/firefox.png' },
		title: 'Firefox',
		download: '/firefox.zip',
	},
];

export const HomeScreen: FC = () => {
	const onIconPress = ({ download }: ExtensionConfig) => {
		console.log('hmm');
		Linking.openURL(download);
	};

	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-5xl mb-3">COMING SOON!</Text>
			<Text className="text-lg mb-3">
				<Text>Created with ❤️ by </Text>
				<Hyperlink href="https://stormgate.io" title="Stormgate.io" />
			</Text>
			<Text className="font-light text-xs text-white/60 my-6">
				technical preview download bellow
			</Text>
			<View className="flex-row pt-5">
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
	);
};

export default HomeScreen;
