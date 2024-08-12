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

export const useWidgets = ({ filterAdded }: Options) => {
	const { map } = useSnapshot(widgetState);
	const { remoteConfig } = useSnapshot(appState);

	return useMemo(() => {
		if (filterAdded) {
			const widgets = Array.from(map.values());
			return sortBy(widgets, 'timestamp');
		}

		const widgets = mockWidgets.map((widget) => {
			if (widget.category === WidgetSubcategories.CUSTOM_WALLET) {
				(widget.metadata as CustomWalletMetadata).tokens =
					remoteConfig.customWallets?.[widget._id].tokens;
				(widget.metadata as CustomWalletMetadata).nfts =
					remoteConfig.customWallets?.[widget._id].nfts;
			}

			return widget;
		});

		return widgets;
	}, [map]);
};
