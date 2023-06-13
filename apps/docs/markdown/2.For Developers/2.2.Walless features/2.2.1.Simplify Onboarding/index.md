# Simplify Onboarding


Mirror World Smart Platform was built to simplify the process of building Multi-Chain Web3 Web and Mobile applications for high-conversion or even for hobbyists that want to build simple applications. We offers easy-to-use APIs and cross-platform SDKs around 6 main solutions:

####1. Smart Authentication.

a. User-friendly authentication method implemented in 30 mins.
b. Simplified onboarding process with mainstream social account such as Google, Facebook, Twitter, Discord and Email.
c. Easy-to-use APIs that accelerated your development process. Check On/Off-Ramp Service

```tsx
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
			<SideNavigation nodes={node?.children as DocsTree[]} params={params} />
			<Markdown
				style={{ maxWidth: 1000 }}
				content={loadContent(docsTree, path) || '##Coming soon'}
			/>
		</View>
	);
};

export default Content;

const styles = StyleSheet.create({
	container: {
		paddingTop: 40,
		gap: 30,
		justifyContent: 'center',
	},
});
```
