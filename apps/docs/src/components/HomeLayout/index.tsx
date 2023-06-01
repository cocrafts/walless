import { type FC } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
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
			<View style={styles.contentContainer}>
				<TopNavigation docs={docs} docsTree={docsTree} />
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.contentContainer}>
					<Content docsTree={docsTree} docs={docs} params={params} />
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100vh',
	},
	contentContainer: {
		width: '100%',
		maxWidth: 1620,
		margin: 'auto',
	},
});

export default HomeLayout;
