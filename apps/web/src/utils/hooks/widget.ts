import { useMemo } from 'react';
import { widgetState } from '@walless/app';
import sortBy from 'lodash/sortBy';
import { useSnapshot } from 'valtio';

export const useWidgets = () => {
	const { map } = useSnapshot(widgetState);

	return useMemo(() => {
		const widgets = Array.from(map.values());
		return sortBy(widgets, 'timestamp');
	}, [map]);
};
