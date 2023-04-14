import { type ImageURISource } from 'react-native';

export interface ExtensionConfig {
	title: string;
	download: string;
	iconSrc: ImageURISource;
}

const makeExtensionConfig = (name: string) => ({
	title: name,
	download: `/builds/${name.toLowerCase()}.zip`,
	iconSrc: { uri: `/img/${name.toLowerCase()}.png` },
});

export const extensions: ExtensionConfig[] = [
	makeExtensionConfig('Chrome'),
	makeExtensionConfig('Firefox'),
	makeExtensionConfig('Brave'),
	makeExtensionConfig('Edge'),
	makeExtensionConfig('Opera'),
];
