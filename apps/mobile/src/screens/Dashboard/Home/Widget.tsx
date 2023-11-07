import { useSnapshot, WidgetFeature } from '@walless/app';
import { appState } from '@walless/engine';

export const WidgetScreen = () => {
	const { activeWidgetId } = useSnapshot(appState);
	return <WidgetFeature id={activeWidgetId} />;
};

export default WidgetScreen;
