import { useMemo } from 'react';
import type { CustomWalletMetadata } from '@walless/core';
import { WidgetSubcategories } from '@walless/core';
import { sortBy } from 'lodash';
import { appState } from 'state/app';
import { mockWidgets, widgetState } from 'state/widget';

import { useSnapshot } from './aliased';

interface Options {
	filterAdded?: boolean;
}

export const useWidgets = (option?: Options) => {
	const { map } = useSnapshot(widgetState);
	const { remoteConfig } = useSnapshot(appState);

	return useMemo(() => {
		if (option) {
			const { filterAdded } = option;
			if (!filterAdded) {
				const widgets = mockWidgets.map((widget) => {
					if (widget.category === WidgetSubcategories.CUSTOM_WALLET) {
						widget.metadata = remoteConfig.customWallets?.[
							widget._id
						] as CustomWalletMetadata;
					}

					return widget;
				});

				return widgets;
			}
		}

		const widgets = Array.from(map.values());
		return sortBy(widgets, 'timestamp');
	}, [map]);
};
