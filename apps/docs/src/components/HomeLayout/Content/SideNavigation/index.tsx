import { type FC, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import Link from 'next/link';
import { type DocsTree } from 'utils/types';

interface Props {
	nodes: DocsTree[];
	params: string[];
}

export const SideNavigation: FC<Props> = ({ nodes, params }) => {
	const renderNode = (node: DocsTree, level = 0) => {
		return (
			<Fragment>
				{node.children ? (
					<Text
						style={{
							...styles[`lvl${level + 1}` as keyof typeof styles],
							...styles.shared,
							marginLeft: 12 * level,
						}}
						selectable={false}
					>
						{node.name}
					</Text>
				) : (
					<Link
						key={node.path}
						style={{
							...styles[`lvl${level + 1}` as keyof typeof styles],
							...styles.shared,
							marginLeft: 12 * level,
						}}
						href={node.path}
					>
						{node.name}
					</Link>
				)}

				{node.children &&
					node.children.map((childNode: DocsTree) =>
						renderNode(childNode, level + 1),
					)}
			</Fragment>
		);
	};

	console.log(params);

	return (
		<View style={styles.container}>
			{nodes.map((node) => renderNode(node))}
		</View>
	);
};

export default SideNavigation;

const styles = StyleSheet.create({
	container: {
		minWidth: 200,
	},
	shared: {
		fontFamily: 'Rubik',
		marginBottom: 10,
		textDecorationLine: 'none',
	},
	lvl1: {
		textTransform: 'uppercase',
		fontSize: 15,
		fontWeight: '500',
		color: '#FFF',
	},
	lvl2: {
		color: '#566674',
	},
});
