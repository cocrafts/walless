import type { ImageSourcePropType } from 'react-native';
import { resources } from 'utils/config';

export interface NewsArticle {
	title: string;
	description: string;
	link: string;
	image: ImageSourcePropType;
}

export const mockData: NewsArticle[] = [
	{
		title: 'Walless: The Web3 Wallet Igniting a New Era of Brand Engagement',
		description:
			'Introducing Walless, the wallet redefining the Web3 experience. Empowering projects with dizzying levels of customization...',
		link: 'https://www.tzapac.com/articles/walless-the-web3-wallet-igniting-a-new-era-of-brand-engagement/',
		image: resources.home.news.tzapacArticle,
	},
	{
		title: 'Introducing Walless - making Web3 onboarding as simple as email',
		description:
			'Our goal is to make #cryptowallets easily accessible, understandable, and integratable into both web2 and web3...',
		link: 'https://twitter.com/walless_wallet/status/1635892684308234240?s=20',
		image: resources.home.news.twitterArticle,
	},
];
