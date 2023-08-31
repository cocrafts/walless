import { useEffect, useState } from 'react';
import type { Widget, WidgetStatus } from '@walless/graphql';
import { mutations, queries } from '@walless/graphql';
import { Text } from '@walless/gui';
import { HomeLayout } from 'components/layouts';
import { WidgetInfo } from 'features/AdminDashboard';
import { qlClient } from 'utils/graphql';

const fetchWidgetsData = async () => {
	const data = await qlClient.request<{ widgets: Widget[] }>(
		queries.allWidgets,
	);
	return data.widgets;
};

const AdminDashboardPage = () => {
	const [widgets, setWidgets] = useState<Widget[]>([]);
	const [isChanged, setIsChanged] = useState(false);

	useEffect(() => {
		try {
			fetchWidgetsData().then(setWidgets);
			setIsChanged(false);
		} catch (error) {
			console.error(error);
		}
	}, [isChanged]);

	const handleUpdateStatus = async (id: string, status: WidgetStatus) => {
		const data = await qlClient.request<{ updateWidgetStatus: boolean }>(
			mutations.updateWidgetStatus,
			{
				id,
				status,
			},
		);
		setIsChanged(data.updateWidgetStatus);
	};

	return (
		<HomeLayout>
			{widgets.length === 0 && <Text>No widgets</Text>}

			{widgets.map((widget) => (
				<WidgetInfo
					key={widget.id}
					onUpdateStatus={handleUpdateStatus}
					item={widget}
				/>
			))}
		</HomeLayout>
	);
};

export default AdminDashboardPage;
