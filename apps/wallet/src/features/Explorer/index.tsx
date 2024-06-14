import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';

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
	return (
		<View style={[style]}>
			<Header />
			<ScrollView showsVerticalScrollIndicator={false}>
				<LoyaltyBar style={styles.loyaltyBar} />
				<Missions />
				<Highlights />
				<Widgets />
			</ScrollView>
		</View>
	);
};

export default ExplorerFeature;

const styles = StyleSheet.create({
	loyaltyBar: {
		marginTop: 16,
		marginBottom: 12,
		maxHeight: 72,
		marginHorizontal: 20,
	},
});
