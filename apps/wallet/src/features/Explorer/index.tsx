import type { FC } from 'react';
import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import type { CustomWalletMetadata } from '@walless/core';
import { WidgetCategory } from '@walless/core';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import { mockWidgets } from 'state/widget';
import { useNfts, useTokens } from 'utils/hooks';
import {
	filterAssetsFromCustomWalletAssets,
	filterTokensWithAmountFromCustomWalletToken,
} from 'utils/widget';

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
			mockWidgets.filter((item) => {
				if (item.category === WidgetCategory.CUSTOM_WALLET) {
					const requiredTokens = (item?.customMetadata as CustomWalletMetadata)
						.tokens;
					const filteredTokens = filterTokensWithAmountFromCustomWalletToken(
						requiredTokens || [],
						tokens,
					);

					const requiredNfts = (item?.customMetadata as CustomWalletMetadata)
						.nfts;
					const filteredNfts = filterAssetsFromCustomWalletAssets(
						requiredNfts || [],
						{
							ownedNfts: nfts,
						},
					);

					return filteredTokens.length !== 0 || filteredNfts.length !== 0;
				}

				return true;
			}),
		[tokens],
	);

	return (
		<View style={[styles.container, style]}>
			<Header style={styles.headerContainer} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<LoyaltyBar style={styles.loyaltyContainer} />
				<Missions style={styles.missionContainer} />
				<Highlights data={widgets} />
				<Widgets data={widgets} />
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
