import type { FC } from 'react';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';

import type { CardSkin } from '../../components/WalletCard';

import BuiltInNetwork from './BuiltInNetwork';
import NotFound from './NotFound';

export interface WidgetProps {
	id: string;
}

export type WidgetComponent = FC<WidgetProps>;

export const widgetMap: Record<string, WidgetComponent> = {
	sui: BuiltInNetwork,
	tezos: BuiltInNetwork,
	solana: BuiltInNetwork,
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
	} else {
		throw Error('Unsupported network');
	}

	return {
		backgroundSrc: asset.cardBackground,
		iconSrc: asset.cardIcon,
		largeIconSrc: asset.cardMark,
		iconColor,
		iconSize,
	};
};
