import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import Advertisement from 'features/Widget/CustomWalletLayout/Advertisement';

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

const ads = [
	{
		title: 'Cute Kitten',
		image: 'https://placehold.co/640x480/e67e22/ffffff',
		link: 'https://example.com/kitten',
	},
	{
		title: 'Majestic Mountain',
		image: 'https://placehold.co/640x480/39cccc/ffffff',
		link: 'https://example.com/mountain',
	},
	{
		title: 'Vibrant Sunset',
		image: 'https://placehold.co/640x480/f39c12/ffffff',
		link: 'https://example.com/sunset',
	},
];

export const ExplorerFeature: FC<Props> = ({ style }) => {
	return (
		<View style={[styles.container, style]}>
			<Header style={styles.headerContainer} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<LoyaltyBar style={styles.loyaltyContainer} />
				<Missions style={styles.missionContainer} />
				<Highlights />
				<Widgets />
				<Advertisement ads={ads} />
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
