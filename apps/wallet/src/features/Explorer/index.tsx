import type { FC } from 'react';
import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import { mockWidgets } from 'state/widget';
import { useNfts, useTokens } from 'utils/hooks';
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

	const widgets = useMemo(
		() =>
			mockWidgets.filter((widget) => {
				if (filterMap.has(widget._id)) {
					const filters = filterMap.get(widget._id);
					return filters?.some((filter) => filter(widget).hasItems);
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
				<Highlights widgets={widgets} />
				<Widgets widgets={widgets} />
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
