import type { FC } from 'react';
import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import { useNfts, useTokens, useWidgets } from 'utils/hooks';
import { filterMap } from 'utils/widget';

import Header from './Header';
import Highlights from './Highlights';
import LoyaltyBar from './LoyaltyBar';
import Missions from './Missions';
import Widgets from './Widgets';

interface Props {
	style?: StyleProp<ViewStyle>;
	widgets?: WidgetDocument[];
	isHeaderActive?: boolean;
	onToggleDrawer?: () => void;
}

export const ExplorerFeature: FC<Props> = ({ style }) => {
	const { tokens } = useTokens();
	const { nfts } = useNfts();
	const widgets = useWidgets({});

	const filteredWidgets = useMemo(
		() =>
			widgets.filter((widget) => {
				if (filterMap[widget._id]) {
					const filters = filterMap[widget._id];
					return filters?.some((filter) => filter(widget));
				}

				return true;
			}),
		[tokens, nfts],
	);

	return (
		<View style={[styles.container, style]}>
			<Header style={styles.headerContainer} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<LoyaltyBar style={styles.loyaltyContainer} />
				<Missions style={styles.missionContainer} />
				<Highlights widgets={filteredWidgets} />
				<Widgets widgets={filteredWidgets} />
			</ScrollView>
		</View>
	);
};

export default ExplorerFeature;

const styles = StyleSheet.create({
	container: {
		marginVertical: 16,
	},
	headerContainer: {
		marginHorizontal: 16,
		marginBottom: 10,
	},
	loyaltyContainer: {
		maxHeight: 72,
		marginBottom: 12,
		marginHorizontal: 16,
	},
	missionContainer: {
		marginLeft: 16,
	},
});
