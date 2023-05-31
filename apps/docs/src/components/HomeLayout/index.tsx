import { type FC, Fragment } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'next/router';
import { type DocsTree } from 'utils/types';

import Content from './Content';
import TopNavigation from './TopNavigation';

interface Props {
	docs: string;
	params: string[];
	docsTree: DocsTree;
}

export const HomeLayout: FC<Props> = ({ docs, params, docsTree }) => {
	const route = useRouter();

	if (route.isFallback) {
		return <ActivityIndicator />;
	}

	return (
		<Fragment>
			<TopNavigation docs={docs} docsTree={docsTree} />
			<Content docsTree={docsTree} docs={docs} params={params} />
		</Fragment>
	);
};

export default HomeLayout;
