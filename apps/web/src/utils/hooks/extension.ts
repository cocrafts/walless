import { useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import { extensionState } from 'state/extension';
import { useSnapshot } from 'valtio';

export const useExtensions = () => {
	const { map } = useSnapshot(extensionState);

	return useMemo(() => {
		const extensions = Array.from(map.values());
		return sortBy(extensions, 'timestamp');
	}, [map]);
};
