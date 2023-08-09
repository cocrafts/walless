import type { ImageSourcePropType } from 'react-native';
import { resources } from 'utils/config';

interface Partner {
	uri: ImageSourcePropType;
	url: string;
}

export const partners: Partner[] = [
	{
		uri: resources.home.partners.tezos,
		url: 'https://www.tzapac.com/',
	},
	{
		uri: resources.home.partners.solanaUniversity,
		url: 'https://www.solanau.org/',
	},
	{
		uri: resources.home.partners.appworks,
		url: 'https://appworks.tw/',
	},
	{
		uri: resources.home.partners.superteamVietnam,
		url: 'https://twitter.com/SuperteamVN',
	},
	{
		uri: resources.home.partners.sqrDao,
		url: 'https://sqrdao.com/',
	},
];
