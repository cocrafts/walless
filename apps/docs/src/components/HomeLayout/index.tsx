import { type FC } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { useRouter } from 'next/router';
import { sharedStyles } from 'utils/style';
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
			<View style={sharedStyles.container}>
				<TopNavigation docs={docs} docsTree={docsTree} />
			</View>
			<ScrollView
				contentContainerStyle={sharedStyles.container}
				showsVerticalScrollIndicator={false}
			>
				<Content docsTree={docsTree} docs={docs} params={params} />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100vh',
	},
});

export default HomeLayout;
