import { type FC, Fragment } from 'react';
import Markdown from '@walless/markdown';
import { loadContent } from 'utils/content';
import { sharedStyles } from 'utils/style';
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
			<Markdown
				style={sharedStyles.contentContainer}
				content={loadContent(docsTree, path) || '##Coming soon'}
				options={{ lineHeight: 45 }}
			/>
			<SideNavigation nodes={node?.children as DocsTree[]} params={params} />
		</Fragment>
	);
};

export default Content;
