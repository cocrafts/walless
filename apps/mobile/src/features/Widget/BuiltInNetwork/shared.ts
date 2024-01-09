import { Networks } from '@walless/core';
import assets from 'utils/assets';

import EmptyTab from './EmptyTab';
import type { TabAble } from './SliderTabs';
import type { CardSkin } from './WalletCard';

export const getWalletCardSkin = (id: Networks): CardSkin => {
	let asset;
	let iconSize = 16;
	let iconColor = '#242424';

	if (id === Networks.solana) {
		asset = assets.widget.solana;
		iconColor = '#000000';
	} else if (id === Networks.tezos) {
		asset = assets.widget.tezos;
		iconColor = '#2D7DF8';
	} else if (id === Networks.sui) {
		iconColor = '#FFFFFF';
		iconSize = 12;
		asset = assets.widget.sui;
	} else if (id === Networks.aptos) {
		iconColor = '#000000';
		asset = assets.widget.aptos;
	} else {
		throw Error('Unsupported network');
	}

	return {
		backgroundSrc: asset.widgetMeta.cardBackground,
		iconSrc: asset.widgetMeta.cardIcon,
		largeIconSrc: asset.widgetMeta.cardMark,
		iconColor,
		iconSize,
	};
};

export const layoutTabs: TabAble[] = [
	{
		id: 'tokens',
		title: 'Tokens',
		component: EmptyTab,
	},
	{
		id: 'collectibles',
		title: 'Collectibles',
		component: EmptyTab,
	},
	{
		id: 'activities',
		title: 'Activities',
		component: EmptyTab,
	},
];
