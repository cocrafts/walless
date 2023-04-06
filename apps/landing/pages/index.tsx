import { Fragment, ReactElement } from 'react';
import HomeLayout from 'components/layouts/Home';
import HeadingSection from 'screens/home/Heading';

export const IndexPage = () => {
	return (
		<Fragment>
			<HeadingSection />
		</Fragment>
	);
};

IndexPage.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default IndexPage;
