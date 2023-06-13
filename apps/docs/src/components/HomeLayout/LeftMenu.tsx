import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { type DocsTree } from 'utils/types';

import SideNavigation from './SideNavigation';

interface Props {
	nodes: DocsTree[];
	params: string[];
	onPressItem: () => void;
}

const LeftMenu: FC<Props> = ({ nodes, params, onPressItem }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Walless Documentation</Text>
			<SideNavigation
				containerStyle={styles.sideNavigationStyle}
				nodes={nodes}
				params={params}
				onPressItem={onPressItem}
			/>
		</View>
	);
};

export default LeftMenu;

const styles = StyleSheet.create({
	container: {
		padding: 30,
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
	},
	sideNavigationStyle: {
		marginTop: 30,
	},
});
