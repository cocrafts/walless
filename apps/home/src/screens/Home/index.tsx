import { FC } from 'react';
import { ImageSourcePropType, Linking } from 'react-native';
import { Hyperlink } from '@metacraft/ui';
import { Image, Text, View } from '@walless/ui';
import ExtensionIcon from 'components/ExtensionIcon';

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

	return (
		<View className="flex-1 items-center justify-center">
			<Image className="w-48 h-48 mb-8" source={{ uri: '/img/icon-lg.png' }} />
			<Text className="text-5xl mb-3">COMING SOON!</Text>
			<Text className="text-lg mb-3">
				<Text>Created with ❤️ by </Text>
				<Hyperlink href="https://stormgate.io" title="Stormgate.io" />
			</Text>
			<Text className="font-light text-xs text-white/60 my-6">
				Get early access below - testing only.
			</Text>
			<View className="flex-row pt-12">
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
