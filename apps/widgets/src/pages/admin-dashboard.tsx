import type { FC } from 'react';
import type { Widget, WidgetStatus } from '@walless/graphql';
import { qlClient } from '@walless/graphql';
import { updateWidgetStatus } from '@walless/graphql/mutation';
import { allWidgets } from '@walless/graphql/query';
import { Text } from '@walless/gui';
import { HomeLayout } from 'components/layouts';
import { WidgetInfo } from 'features/AdminDashboard';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
	const localEndpoint = 'http://localhost:8080/graphql';
	qlClient.setEndpoint(localEndpoint);

	const data = (await qlClient.request(allWidgets)) as { widgets: Widget[] };

	return {
		props: {
			widgets: data.widgets,
		},
	};
};

interface Props {
	widgets: Widget[];
}

const AdminDashboardPage: FC<Props> = ({ widgets }) => {
	const handleUpdateStatus = async (id: string, status: WidgetStatus) => {
		console.log('--> update status', id, status);
		const data = await qlClient.request(updateWidgetStatus, { id, status });
		console.log('--> response', data);
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
