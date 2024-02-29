import type { FC } from 'react';

export interface SlideOption {
	id: string;
	component: FC<{ config: SlideOption }>;
	context?: unknown;
}

export interface IndicatorOption {
	id?: string;
	component: FC<{ config: IndicatorOption }>;
	context?: unknown;
	currentActiveIndex?: number;
	setCurrentActiveIndex?: (index: number) => void;
}
