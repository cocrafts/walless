import type { ImageURISource } from 'react-native';

export interface ExtensionConfig {
	disabled: boolean;
	title: string;
	download: string;
	iconSrc: ImageURISource;
}

const chromeUrl =
	'https://chromewebstore.google.com/detail/walless/jfmajkmgjpjognffefopllhaijknhnmm';
const makeExtensionConfig = (
	name: string,
	manualDownload = false,
	disabled = false,
) => ({
	disabled,
	title: name,
	download: manualDownload ? `/builds/${name.toLowerCase()}.zip` : chromeUrl,
	iconSrc: { uri: `/img/${name.toLowerCase()}.png` },
});

export const extensions: ExtensionConfig[] = [
	makeExtensionConfig('Chrome'),
	makeExtensionConfig('Brave'),
	makeExtensionConfig('Firefox', true),
	makeExtensionConfig('Edge'),
	makeExtensionConfig('Opera'),
];
