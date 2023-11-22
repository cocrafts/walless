import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CollectibleFeat, useSafeAreaInsets } from '@walless/app';

export const CollectibleScreen: FC = () => {
	const {
		params: { id = '' },
	} = useRoute();
	const insets = useSafeAreaInsets();
	const collectibleContainerStyle: ViewStyle = {
		marginTop: insets.top,
	};

	return <CollectibleFeat id={id} style={collectibleContainerStyle} />;
};

export default CollectibleScreen;
