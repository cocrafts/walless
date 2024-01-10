import { useMemo } from 'react';
import { widgetState } from '@walless/engine';
import { sortBy } from 'lodash';

import { useSnapshot } from './aliased';

export const useWidgets = () => {
	const { map } = useSnapshot(widgetState);

	return useMemo(() => {
		const widgets = Array.from(map.values());
		return sortBy(widgets, 'timestamp');
	}, [map]);
};
