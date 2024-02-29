import type { FC } from 'react';
import { useMemo } from 'react';
import { withStackContainer } from 'components/StackContainer';

import { extractWidgetComponent } from './internal';

interface WidgetFeatureProps {
	widgetId: string;
	title: string;
	isHeaderActive?: boolean;
	onToggleDrawer: () => void;
}

export const WidgetFeature: FC<WidgetFeatureProps> = ({
	widgetId,
	title,
	isHeaderActive = false,
	onToggleDrawer,
}) => {
	const WidgetComponent = extractWidgetComponent(widgetId);

	const ManageWidgetScreen = useMemo(
		() =>
			withStackContainer(WidgetComponent, {
				title,
				isHeaderActive,
				noBottomTabs: true,
				toggleDrawer: onToggleDrawer,
			}),
		[isHeaderActive],
	);

	return <ManageWidgetScreen id={widgetId} />;
};

export default WidgetFeature;
