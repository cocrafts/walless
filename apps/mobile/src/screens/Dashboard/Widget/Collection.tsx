import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CollectionFeat, useSafeAreaInsets } from '@walless/app';

export const CollectionScreen: FC = () => {
	const {
		params: { id = '' },
	} = useRoute();
	const insets = useSafeAreaInsets();
	const collectionContainerStyle: ViewStyle = {
		marginTop: insets.top,
	};

	return <CollectionFeat id={id} style={collectionContainerStyle} />;
};

export default CollectionScreen;
