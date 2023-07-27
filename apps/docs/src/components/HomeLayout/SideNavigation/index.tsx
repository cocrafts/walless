import type { FC } from 'react';
import { Fragment } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import Link from 'next/link';
import type { DocsTree } from 'utils/types';

interface Props {
	nodes: DocsTree[];
	params: string[];
	containerStyle: ViewStyle;
	onPressItem?: () => void;
}

export const SideNavigation: FC<Props> = ({
	nodes,
	params,
	containerStyle,
	onPressItem,
}) => {
	const renderNode = (node: DocsTree, level = 0, matchingPath = '') => {
		matchingPath += `/${params ? params[level] : ''}`;

		const isActive = node.path.includes(matchingPath);
		const color = isActive ? '#0694d3' : '#DEDEDE';

		const style = {
			...styles[`lvl${level + 1}` as keyof typeof styles],
			...styles.shared,
			marginLeft: 20 * level,
		};

		return (
			<Fragment key={node.path}>
				{!node.content ? (
					<Text style={style} selectable={false} onPress={onPressItem}>
						{node.name}
					</Text>
				) : (
					<Link
						style={{ ...style, color }}
						href={node.path}
						onClick={onPressItem}
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
		<View style={containerStyle}>{nodes.map((node) => renderNode(node))}</View>
	);
};

export default SideNavigation;

const styles = StyleSheet.create({
	shared: {
		fontFamily: 'Roboto Slab',
	},
	lvl1: {
		textTransform: 'uppercase',
		fontSize: 15,
		fontWeight: '500',
		color: '#DEDEDE',
		marginTop: 16,
	},
	lvl2: {
		color: '#DEDEDE',
		marginTop: 10,
	},
	lvl3: {
		fontSize: 14,
		color: '#FFFFFF',
		marginTop: 6,
	},
});
