import { useSnapshot, WidgetFeature } from '@walless/app';
import { appState } from '@walless/engine';

import ExplorerScreen from '../Explore';

export const WidgetScreen = () => {
	const { activeWidgetId } = useSnapshot(appState);

	if (!activeWidgetId) {
		return <ExplorerScreen />;
	}

	return <WidgetFeature id={activeWidgetId} />;
};

export default WidgetScreen;
