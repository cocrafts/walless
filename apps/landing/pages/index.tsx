import { Fragment, ReactElement } from 'react';
import HomeLayout from 'components/layouts/Home';
import FirstScreen from 'screens/home/FirstScreen';
import HeadingSection from 'screens/home/Heading';

export const IndexPage = () => {
	return (
		<Fragment>
			<HeadingSection />
			<FirstScreen />
		</Fragment>
	);
};

IndexPage.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default IndexPage;
