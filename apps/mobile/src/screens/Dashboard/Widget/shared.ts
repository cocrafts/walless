import type { FC } from 'react';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { TabAble } from 'screens/Dashboard/Widget/components/TabsHeader';
import type { CardSkin } from 'screens/Dashboard/Widget/components/WalletCard';

import BuiltInNetwork from './BuiltInNetwork';
import { EmptyTab } from './components';
import NotFound from './NotFound';
import Pixeverse from './Pixeverse';
import TRexRunner from './TRexRunner';

export interface WidgetProps {
	id: string;
}

export type WidgetComponent = FC<WidgetProps>;

export const widgetMap: Record<string, WidgetComponent> = {
	sui: BuiltInNetwork,
	tezos: BuiltInNetwork,
	solana: BuiltInNetwork,
	aptos: BuiltInNetwork,
	tRexRunner: TRexRunner,
	pixeverse: Pixeverse,
};

export const extractWidgetComponent = (id: string): WidgetComponent => {
	return widgetMap[id] || NotFound;
};

export const getWalletCardSkin = (id: Networks): CardSkin => {
	let asset;
	let iconSize = 16;
	let iconColor = '#242424';

	if (id === Networks.solana) {
		asset = modules.asset.widget.solana;
		iconColor = '#000000';
	} else if (id === Networks.tezos) {
		asset = modules.asset.widget.tezos;
		iconColor = '#2D7DF8';
	} else if (id === Networks.sui) {
		iconColor = '#FFFFFF';
		iconSize = 12;
		asset = modules.asset.widget.sui;
	} else if (id === Networks.aptos) {
		iconColor = '#000000';
		asset = modules.asset.widget.aptos;
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
