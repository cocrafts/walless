import { type FC, Fragment } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Markdown from '@walless/markdown';
import { loadContent } from 'utils/content';
import { type DocsTree } from 'utils/types';

import SideNavigation from './SideNavigation';

interface Props {
	docsTree: DocsTree;
	docs: string;
	params: string[];
}

export const Content: FC<Props> = ({ docsTree, docs, params }) => {
	const node = docsTree.children?.find((node) => node.path === `/${docs}`);
	let path = `/${docs}`;
	for (const param of params) {
		path += `/${param}`;
	}

	return (
		<Fragment>
			<ScrollView
				style={{ maxHeight: '90vh' }}
				contentContainerStyle={styles.container}
			>
				<Markdown
					style={{ maxWidth: 1000 }}
					content={loadContent(docsTree, path) || '##Coming soon'}
					options={{ lineHeight: 45 }}
				/>
			</ScrollView>
			<SideNavigation nodes={node?.children as DocsTree[]} params={params} />
		</Fragment>
	);
};

export default Content;

const styles = StyleSheet.create({
	container: {
		paddingTop: 40,
		gap: 30,
		alignItems: 'center',
	},
});
