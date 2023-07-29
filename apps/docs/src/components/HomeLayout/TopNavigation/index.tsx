import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Anchor, Button, dimensionState, Hoverable, View } from '@walless/gui';
import { Menu } from '@walless/icons';
import { resources } from 'utils/config';
import { getDefaultNode } from 'utils/content';
import { sharedStyles } from 'utils/style';
import type { DocsTree } from 'utils/types';
import { useSnapshot } from 'valtio';

import NavigationItem from './Item';

interface Props {
	docs: string;
	docsTree: DocsTree;
	onPressMenu: () => void;
}

export const TopNavigation: FC<Props> = ({ docs, docsTree, onPressMenu }) => {
	const { responsiveLevel } = useSnapshot(dimensionState);

	const docsList = docsTree.children?.map((doc) => {
		const link = getDefaultNode(doc)?.path;
		return {
			name: doc.name,
			path: doc.path,
			link,
		};
	});

	return (
		<View style={styles.container}>
			<View style={[sharedStyles.container, styles.innerContainer]}>
				<Anchor href="https://walless.io/">
					<Image
						source={resources.walless.horizontalLogo}
						style={styles.logo}
					/>
				</Anchor>

				{responsiveLevel < 1 && (
					<View horizontal style={styles.groupItem}>
						{docsList?.map((doc) => {
							return (
								<NavigationItem
									key={doc.name}
									isActive={doc.path === `/${docs}`}
									title={doc.name}
									href={doc.link as string}
								/>
							);
						})}
					</View>
				)}

				<View style={styles.rightContainer}>
					<Button
						style={styles.joinButton}
						title="Join waitlist"
						titleStyle={styles.joinButtonTitle}
					/>

					{responsiveLevel >= 1 && (
						<Hoverable style={styles.menuButton} onPress={onPressMenu}>
							<Menu />
						</Hoverable>
					)}
				</View>
			</View>
		</View>
	);
};

export default TopNavigation;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 14,
	},
	logo: {
		width: 160,
		aspectRatio: 128 / 14,
	},
	groupItem: {
		justifyContent: 'center',
	},
	rightContainer: {
		flexDirection: 'row',
		gap: 20,
	},
	joinButton: {
		paddingHorizontal: 30,
		paddingVertical: 8,
		borderRadius: 12,
	},
	joinButtonTitle: {
		fontWeight: '500',
		fontSize: 14,
	},
	menuButton: {
		justifyContent: 'center',
		paddingHorizontal: 6,
	},
});
