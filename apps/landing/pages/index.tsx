import HomeLayout from 'components/layouts/Home';
import FirstScreen from 'screens/home/FirstScreen';

export const IndexPage = () => {
	return (
		<HomeLayout>
			<FirstScreen />
		</HomeLayout>
	);
};

export default IndexPage;
