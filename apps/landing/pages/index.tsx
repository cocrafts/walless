import { Fragment, ReactElement } from 'react';
import HomeLayout from 'components/layouts/Home';
import FirstScreen from 'screens/home/FirstScreen';

export const IndexPage = () => {
	return (
		<Fragment>
			<FirstScreen />
		</Fragment>
	);
};

IndexPage.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default IndexPage;
