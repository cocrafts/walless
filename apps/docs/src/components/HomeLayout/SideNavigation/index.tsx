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
	const renderNode = (node: DocsTree, level = 0, matchingPath = '') => {
		matchingPath += `/${params ? params[level] : ''}`;
		const isActive = node.path.includes(matchingPath);
		const textActiveStyle = isActive ? 'underline' : 'none';
		const style = {
			...styles[`lvl${level + 1}` as keyof typeof styles],
			...styles.shared,
			marginLeft: 20 * level,
		};

		return (
			<Fragment key={node.path}>
				{!node.content ? (
					<Text style={style} selectable={false}>
						{node.name}
					</Text>
				) : (
					<Link
						style={{ ...style, textDecoration: textActiveStyle }}
						href={node.path}
					>
						{node.name}
					</Link>
				)}

				{node.children &&
					node.children.map((childNode: DocsTree) =>
						renderNode(childNode, level + 1, matchingPath),
					)}
			</Fragment>
		);
	};

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
		maxWidth: 500,
		position: 'absolute',
		top: 130,
		left: 30,
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
