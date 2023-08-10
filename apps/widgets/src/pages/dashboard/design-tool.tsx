import { StyleSheet } from 'react-native';
import { DashboardLayout } from 'components/layouts';
import { EditTool } from 'features/dashboard';

const DesignToolPage = () => {
	return (
		<DashboardLayout>
			<EditTool />
		</DashboardLayout>
	);
};

export default DesignToolPage;

const styles = StyleSheet.create({});
