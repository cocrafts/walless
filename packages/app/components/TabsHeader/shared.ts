import { type FC } from 'react';

export interface TabAble {
	id: string;
	title: string;
	component?: FC;
}
