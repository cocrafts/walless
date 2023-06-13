import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { AnimatedView, Button, Text, View } from '@walless/gui';
import Markdown from '@walless/markdown';
import { type GetStaticProps } from 'next';
import { loadContent } from 'utils/content';
import { loadMarkdown } from 'utils/engine';
import { type DocsTree } from 'utils/types';

interface Props {
	docsTree?: DocsTree;
}

const IndexPage: FC<Props> = ({ docsTree }) => {
	const size = useSharedValue(1);

	const boxStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: size.value,
				},
			],
		};
	}, [size]);

	const handlePress = () => {
		if (size.value < 1) size.value = withSpring(size.value * 1.5);
		else size.value = withSpring(size.value * 0.5);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Hello Document Page</Text>
			<AnimatedView style={[styles.animatedBox, boxStyle]} />
			<Button onPress={() => handlePress()} title={'Click me!'} />

			{docsTree && (
				<Markdown
					content={
						loadContent(docsTree, '/') || 'Not found markdown in this path'
					}
				/>
			)}
		</View>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const docsTree = await loadMarkdown();

	return {
		props: { docsTree },
	};
};

const styles = StyleSheet.create({
	container: {
		minHeight: '100vh',
		minWidth: '100wh',
		backgroundColor: '#ccc',
		justifyContent: 'center',
		alignItems: 'center',
	},
	animatedBox: {
		width: 100,
		height: 100,
		backgroundColor: 'blue',
	},
	h1: {
		fontSize: 20,
		color: 'black',
	},
});
