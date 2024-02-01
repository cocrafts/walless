import type { FC } from 'react';
import type {
	StackNavigationOptions,
	StackScreenProps,
} from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from 'components/StackContainer';
import {
	type CollectionParamList,
	type ExploreParamList,
	navigateBack,
} from 'utils/navigation';

import CollectibleFeat from './Collectible';
import CollectionFeat from './Collection';

type Props = StackScreenProps<ExploreParamList, 'Collection'>;

const Stack = createStackNavigator<CollectionParamList>();

const CollectionStack: FC<Props> = () => {
	const screenOptions: StackNavigationOptions = {
		headerShown: false,
	};

	const ManagedCollectionScreen = withStackContainer(CollectionFeat, {
		title: 'Collection',
		goBack: navigateBack,
		noBottomTabs: true,
	});

	const ManagedCollectibleScreen = withStackContainer(CollectibleFeat, {
		title: 'Collectible',
		goBack: navigateBack,
		noBottomTabs: true,
	});

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ManagedCollectionScreen} />
			<Stack.Screen name="Collectible" component={ManagedCollectibleScreen} />
		</Stack.Navigator>
	);
};

export default CollectionStack;
