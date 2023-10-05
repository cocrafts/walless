import type { WidgetDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface WidgetState {
	map: Map<string, WidgetDocument>;
}

export const widgetState = proxy<WidgetState>({
	map: proxyMap(),
});
