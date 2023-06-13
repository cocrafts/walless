import { type FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Anchor, Button, View } from '@walless/gui';
import { resources } from 'utils/config';
import { getDefaultNode } from 'utils/content';
import { type DocsTree } from 'utils/types';

import NavigationItem from './Item';

interface Props {
	docs: string;
	docsTree: DocsTree;
}

export const TopNavigation: FC<Props> = ({ docs, docsTree }) => {
	const docsList = docsTree.children?.map((doc) => {
		const link = getDefaultNode(doc)?.path;
		return {
			name: doc.name,
			path: doc.path,
			link,
		};
	});

	return (
		<View horizontal style={styles.container}>
			<Anchor href="https://walless.io/">
				<Image source={resources.walless.horizontalLogo} style={styles.logo} />
			</Anchor>
			<View horizontal style={styles.groupItem}>
				{docsList?.map((doc) => {
					const isActive = doc.path === `/${docs}`;

					return (
						<NavigationItem
							key={doc.name}
							isActive={isActive}
							title={doc.name}
							href={doc.link as string}
						/>
					);
				})}
			</View>
			<Button
				style={styles.button}
				title="Join waitlist"
				titleStyle={styles.buttonTitle}
			/>
		</View>
	);
};

export default TopNavigation;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},
	logo: {
		width: 160,
		aspectRatio: 128 / 14,
	},
	groupItem: {
		justifyContent: 'center',
	},
	button: {
		paddingHorizontal: 30,
		paddingVertical: 8,
		borderRadius: 12,
	},
	buttonTitle: {
		fontWeight: '500',
		fontSize: 14,
	},
});
