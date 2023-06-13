import { type FC, Fragment, useRef } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { dimensionState, View } from '@walless/gui';
import Markdown from '@walless/markdown';
import { useRouter } from 'next/router';
import { loadContent } from 'utils/content';
import { sharedStyles } from 'utils/style';
import { type DocsTree } from 'utils/types';
import { useSnapshot } from 'valtio';

import SideNavigation from './SideNavigation';
import TopNavigation from './TopNavigation';

interface Props {
	docs: string;
	params: string[];
	docsTree: DocsTree;
}

export const HomeLayout: FC<Props> = ({ docs, params, docsTree }) => {
	const route = useRouter();

	const node = docsTree.children?.find((node) => node.path === `/${docs}`);
	let path = `/${docs}`;
	if (params) {
		for (const param of params) {
			path += `/${param}`;
		}
	}

	const { responsiveLevel, windowSize } = useSnapshot(dimensionState);

	let scrollPaddingLeft = 20;
	if (responsiveLevel >= 1) {
		scrollPaddingLeft = 20;
	} else if (windowSize.width < 1200) {
		scrollPaddingLeft = 300;
	} else if (windowSize.width < 1340) {
		scrollPaddingLeft = 200;
	} else if (windowSize.width < 1400) {
		scrollPaddingLeft = 100;
	}

	return (
		<Fragment>
			{route.isFallback ? (
				<ActivityIndicator />
			) : (
				<View style={styles.container}>
					<View style={[sharedStyles.container, styles.navigationContainer]}>
						<TopNavigation docs={docs} docsTree={docsTree} />
						{responsiveLevel < 1 && (
							<SideNavigation
								nodes={node?.children as DocsTree[]}
								params={params}
							/>
						)}
					</View>
					<ScrollView
						contentContainerStyle={[
							sharedStyles.container,
							{
								paddingLeft: scrollPaddingLeft,
							},
						]}
					>
						<Markdown
							style={[sharedStyles.contentContainer, styles.markdownContainer]}
							content={loadContent(docsTree, path) || '##Coming soon'}
							options={{ lineHeight: 45 }}
						/>
					</ScrollView>
				</View>
			)}
		</Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100vh',
	},
	navigationContainer: {
		zIndex: 1,
	},
	markdownContainer: {
		marginBottom: 100,
	},
});

export default HomeLayout;
