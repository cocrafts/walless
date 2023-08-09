import { StyleSheet } from 'react-native';
import { HomeLayout } from 'components/layouts';
import { EditTool } from 'features/dashboard';

const DesignToolPage = () => {
	return (
		<HomeLayout>
			<EditTool />
		</HomeLayout>
	);
};

export default DesignToolPage;

const styles = StyleSheet.create({});
