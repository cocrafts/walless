import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';

import Header from './Header';
import Highlights from './Highlights';
import { missions } from './internal';
import MissionItem from './MissionItem';

interface Props {
	style?: StyleProp<ViewStyle>;
	widgets?: WidgetDocument[];
	isHeaderActive?: boolean;
	onToggleDrawer?: () => void;
}

export const ExplorerFeature: FC<Props> = ({ style }) => {
	return (
		<View style={[style, styles.container]}>
			<Header />
			<FlatList
				style={styles.flatList}
				data={missions}
				renderItem={({ item, index }) => {
					let colors = ['#EC74A2', '#F4B999'];
					if (index % 3 === 1) {
						colors = ['#8253FF', '#D73EFF'];
					} else if (index % 3 === 2) {
						colors = ['#3263FF', '#45CFFF'];
					}

					return <MissionItem title={item.title} colors={colors} />;
				}}
				horizontal
				showsVerticalScrollIndicator={false}
			/>
			<Highlights />
		</View>
	);
};

export default ExplorerFeature;

const styles = StyleSheet.create({
	container: {
		gap: 16,
		paddingHorizontal: 16,
	},
	widgetItem: {
		marginHorizontal: 16,
	},
	flatList: {
		flexGrow: 0,
	},
});
