import type { FC } from 'react';

import BuiltInNetwork from './BuiltInNetwork';
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
	return widgetMap[id];
};

export const isValidWidget = (id: string): boolean => {
	return widgetMap[id] ? true : false;
};
