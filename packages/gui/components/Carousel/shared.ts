import type { ReactNode } from 'react';

export interface CarouselItem {
	id: string;
}

export interface CarouselItemRendererProps {
	index: number;
	item: CarouselItem;
}

export type CarouselItemRenderer = (
	props: CarouselItemRendererProps,
) => ReactNode;
