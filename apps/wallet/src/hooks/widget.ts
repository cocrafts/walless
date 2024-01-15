import { useMemo } from 'react';
import { sortBy } from 'lodash';
import { widgetState } from 'state';

import { useSnapshot } from './aliased';

export const useWidgets = () => {
	const { map } = useSnapshot(widgetState);

	return useMemo(() => {
		const widgets = Array.from(map.values());
		return sortBy(widgets, 'timestamp');
	}, [map]);
};
