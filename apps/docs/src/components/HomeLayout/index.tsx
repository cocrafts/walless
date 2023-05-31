import { type FC } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
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
		<View style={styles.container}>
			<TopNavigation docs={docs} docsTree={docsTree} />
			<Content docsTree={docsTree} docs={docs} params={params} />
		</View>
	);
};

export default HomeLayout;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
	},
});
