import type { FC } from 'react';

import BuiltInNetwork from './BuiltInNetwork';
import NotFound from './NotFound';
import Pixeverse from './Pixeverse';
import SUIJump from './SUIJump';
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
	suijump: SUIJump,
};

export const extractWidgetComponent = (id: string): WidgetComponent => {
	return widgetMap[id] || NotFound;
};
