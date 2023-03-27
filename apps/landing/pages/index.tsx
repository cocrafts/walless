import { ReactElement } from 'react';
import { Stack, Text } from '@walless/wui';

import { HomeLayout } from '../components/layouts/Home';

export const IndexPage = () => {
	return (
		<Stack>
			<Text>Web!</Text>
		</Stack>
	);
};

IndexPage.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default IndexPage;
