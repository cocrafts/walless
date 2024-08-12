import type { Config, RemoteConfig } from '@walless/core';
import { Networks } from '@walless/core';
import { gradientDirection } from '@walless/gui';

export const noHeaderNavigation = {
	headerShown: false,
};

export const tabBarHeight = 52;

export const defaultConfig: Omit<Config, 'version'> = {
	hideBalance: true,
	latestLocation: '/',
};

export const defaultRemoteConfig: RemoteConfig = {
	experimentalEnabled: true,
	deepAnalyticsEnabled: true,
	minimalVersion: '1.0.0',
	customWallets: {
		samo: {
			coverBanner: '/img/widget/samo-banner.png',
			iconSrc: '/img/widget/samo-icon.png',
			backgroundColor: '#141121',
			actionButtonBackgroundColors: {
				send: '#0051BD',
				receive: '#3D55BF',
				buy: '#7E60D2',
				swap: '#C36BE5',
			},
			activeTabStyle: {
				linearGradient: {
					direction: gradientDirection.LeftToRight,
					colors: ['#1A4FB5', '#C36BE5'],
				},
				textStyle: {
					color: 'white',
					fontWeight: '500',
				},
			},
			advertisements: [
				{
					title: 'Get your SAMO debit card',
					link: '',
					image: '/img/widget/samo-ad-1.png',
				},
				{
					title: 'Get your SAMO debit card',
					link: '',
					image: '/img/widget/samo-ad-1.png',
				},
				{
					title: 'Get your SAMO debit card',
					link: '',
					image: '/img/widget/samo-ad-1.png',
				},
				{
					title: 'Get your SAMO debit card',
					link: '',
					image: '/img/widget/samo-ad-1.png',
				},
			],
			network: Networks.solana,
			tokens: {
				'7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU': {
					mintAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
					amount: 50000,
				},
				So11111111111111111111111111111111111111112: {
					mintAddress: 'So11111111111111111111111111111111111111112',
				},
			},
			nfts: {
				'98fe506a37c46d67b7212ec689decd6fcd7137ea751fb88d9c7fe89c60c5215f': {
					mintAddress:
						'98fe506a37c46d67b7212ec689decd6fcd7137ea751fb88d9c7fe89c60c5215f',
				},
			},
		},
	},
};

/**
 * Solana only
 */
export const solMint = '11111111111111111111111111111111';
export const wrappedSolMint = 'So11111111111111111111111111111111111111112';
export const METADATA_PROGRAM_ID =
	'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';

/**
 * Sui only
 */
export const SUI_COIN_TYPE = '0x2::sui::SUI';
