import { type FC } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import Markdown from '@walless/markdown';
import { useRouter } from 'next/router';
import { loadContent } from 'utils/content';
import { sharedStyles } from 'utils/style';
import { type DocsTree } from 'utils/types';

import SideNavigation from './SideNavigation';
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

	const node = docsTree.children?.find((node) => node.path === `/${docs}`);
	let path = `/${docs}`;
	if (params) {
		for (const param of params) {
			path += `/${param}`;
		}
	}

	return (
		<View style={styles.container}>
			<View style={[sharedStyles.container, styles.navigationContainer]}>
				<TopNavigation docs={docs} docsTree={docsTree} />
				<SideNavigation nodes={node?.children as DocsTree[]} params={params} />
			</View>
			<ScrollView
				contentContainerStyle={[sharedStyles.container, styles.scrollContainer]}
			>
				<Markdown
					style={[sharedStyles.contentContainer, styles.markdownContainer]}
					content={loadContent(docsTree, path) || '##Coming soon'}
					options={{ lineHeight: 45 }}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100vh',
	},
	navigationContainer: {
		zIndex: 1,
	},
	scrollContainer: {
		paddingLeft: 300,
	},
	markdownContainer: {
		marginBottom: 100,
	},
});

export default HomeLayout;
