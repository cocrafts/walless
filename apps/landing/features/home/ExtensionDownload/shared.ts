import type { ImageURISource } from 'react-native';

export interface ExtensionConfig {
	disabled: boolean;
	title: string;
	download: string;
	iconSrc: ImageURISource;
}

const makeExtensionConfig = (name: string, disabled = false) => ({
	disabled,
	title: name,
	download: `/builds/${name.toLowerCase()}.zip`,
	iconSrc: { uri: `/img/${name.toLowerCase()}.png` },
});

export const extensions: ExtensionConfig[] = [
	makeExtensionConfig('Chrome'),
	makeExtensionConfig('Brave'),
	makeExtensionConfig('Firefox'),
	makeExtensionConfig('Edge'),
	makeExtensionConfig('Opera'),
];
