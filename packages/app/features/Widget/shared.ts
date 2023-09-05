import type { FC } from 'react';

import NotFound from './NotFound';
import Solana from './Solana';

export const widgetMap: Record<string, FC> = {
	solana: Solana,
};

export const extractWidgetComponent = (id: string): FC => {
	return widgetMap[id] || NotFound;
};
