import { FC } from 'react';

export interface SlideOption {
	id: string;
	component: FC<{ item: SlideOption }>;
}
