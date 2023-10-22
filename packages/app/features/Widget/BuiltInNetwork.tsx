import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewStyle,
} from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { Networks } from '@walless/core';

import MainFeatureButtons from '../../components/MainFeatureButtons';
import TokenList from '../../components/TokenList';
import WalletCard from '../../components/WalletCard';
import { copy } from '../../utils';
import { useSafeAreaInsets } from '../../utils/hooks';
import { usePublicKeys, useTokens } from '../../utils/hooks';
import { showSendModal } from '../../utils/modal';

import { getWalletCardSkin } from './shared';

interface Props {
	id: string;
}

export const BuiltInNetwork: FC<Props> = ({ id }) => {
	const insets = useSafeAreaInsets();
	const keys = usePublicKeys(id as Networks);
	const [headerLayout, setHeaderLayout] = useState<LayoutRectangle>();
	const { tokens, valuation } = useTokens(id as Networks);
	const cardSkin = useMemo(() => getWalletCardSkin(id as never), [id]);

	const listContainerStyle: ViewStyle = {
		marginTop: insets.top,
		paddingTop: 32,
		paddingHorizontal: 18,
	};

	const onHeaderLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setHeaderLayout(nativeEvent.layout);
	};

	const handlePressSend = () => {
		console.log(tokens, '<-- tokens');
		showSendModal({
			layoutNetwork: id as Networks,
		});
	};

	const listHeader = (
		<View style={styles.headerContainer} onLayout={onHeaderLayout}>
			{headerLayout?.width &&
				keys.map((item, index) => {
					return (
						<WalletCard
							key={index}
							index={index}
							item={item}
							valuation={valuation}
							skin={cardSkin}
							hideBalance={false}
							width={headerLayout.width}
							onCopyAddress={copy}
						/>
					);
				})}
			<MainFeatureButtons onSendPress={handlePressSend} />
		</View>
	);

	return (
		<TokenList
			contentContainerStyle={listContainerStyle}
			items={tokens}
			ListHeaderComponent={listHeader}
		/>
	);
};

export default BuiltInNetwork;

const headingSpacing = 18;
const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		gap: headingSpacing,
		paddingBottom: headingSpacing,
	},
});
