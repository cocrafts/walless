import type { FC } from 'react';
import { useMemo } from 'react';
import { withStackContainer } from 'components/StackContainer';

import { extractWidgetComponent } from './internal';

interface WidgetFeatureProps {
	widgetId: string;
	title: string;
	headerActive?: boolean;
	onToggleDrawer: () => void;
}

export const WidgetFeature: FC<WidgetFeatureProps> = ({
	widgetId,
	title,
	headerActive = false,
	onToggleDrawer,
}) => {
	const WidgetComponent = extractWidgetComponent(widgetId);

	const ManageWidgetScreen = useMemo(
		() =>
			withStackContainer(WidgetComponent, {
				title,
				headerActive,
				noBottomTabs: true,
				toggleDrawer: onToggleDrawer,
			}),
		[],
	);

	return <ManageWidgetScreen id={widgetId} />;
};

export default WidgetFeature;
