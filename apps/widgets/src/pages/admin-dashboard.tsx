import { useEffect, useState } from 'react';
import type { Widget, WidgetStatus } from '@walless/graphql';
import { qlClient } from '@walless/graphql';
import { updateWidgetStatus } from '@walless/graphql/mutation';
import { allWidgets } from '@walless/graphql/query';
import { Text } from '@walless/gui';
import { HomeLayout } from 'components/layouts';
import { WidgetInfo } from 'features/AdminDashboard';

const fetchWidgetsData = async () => {
	interface Data {
		widgets: Widget[];
	}
	const data = (await qlClient.request(allWidgets)) as Data;
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
		interface Data {
			updateWidgetStatus: boolean;
		}
		const data = (await qlClient.request(updateWidgetStatus, {
			id,
			status,
		})) as Data;
		setIsChanged(data.updateWidgetStatus);
	};

	return (
		<HomeLayout>
			{widgets.length === 0 && <Text>No widgets</Text>}

			{widgets.map((widget) => (
				<WidgetInfo
					key={widget.id}
					onUpdateStatus={handleUpdateStatus}
					{...widget}
				/>
			))}
		</HomeLayout>
	);
};

export default AdminDashboardPage;
