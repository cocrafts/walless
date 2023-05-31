import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
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
		<View horizontal style={styles.container}>
			<View>
				<SideNavigation nodes={node?.children as DocsTree[]} params={params} />
			</View>
			<View>
				<Markdown content={loadContent(docsTree, path) || 'Coming soon'} />
			</View>
		</View>
	);
};

export default Content;

const styles = StyleSheet.create({
	container: {
		paddingTop: 40,
		gap: 30,
	},
});
