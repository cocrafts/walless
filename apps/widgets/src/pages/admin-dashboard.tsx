import { useEffect } from 'react';
import type { Widget } from '@walless/graphql';
import { Text } from '@walless/gui';
import { HomeLayout } from 'components/layouts';
import { WidgetInfo } from 'features/AdminDashboard';
import { widgetAction } from 'state/index';
import { appState } from 'state/internal';
import { useSnapshot } from 'valtio';

const AdminDashboardPage = () => {
	const snap = useSnapshot(appState);
	const widgets = snap.widgetStore.widgets;

	useEffect(() => {
		widgetAction.fetchWidgets();
	}, []);

	return (
		<HomeLayout>
			{widgets.length === 0 && <Text>No widgets</Text>}
			{widgets.map((widget) => (
				<WidgetInfo key={widget.id} item={widget as Widget} />
			))}
		</HomeLayout>
	);
};

export default AdminDashboardPage;
