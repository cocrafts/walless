import type { FC } from 'react';
import { useMemo } from 'react';
import type {
	StackNavigationOptions,
	StackScreenProps,
} from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withStackContainer } from 'components/StackContainer';
import NFTScreen from 'screens/NFT';
import CollectionScreen from 'screens/NFTCollection';
import {
	type CollectionParamList,
	type ExploreParamList,
	navigateBack,
} from 'utils/navigation';

type Props = StackScreenProps<ExploreParamList, 'Collection'>;

const Stack = createStackNavigator<CollectionParamList>();

const CollectionStack: FC<Props> = () => {
	const screenOptions: StackNavigationOptions = {
		headerShown: false,
	};

	const ManagedCollectionScreen = useMemo(
		() =>
			withStackContainer(CollectionScreen, {
				title: 'Collection',
				goBack: navigateBack,
				noBottomTabs: true,
			}),
		[],
	);

	const ManagedCollectibleScreen = useMemo(
		() =>
			withStackContainer(NFTScreen, {
				title: 'NFT',
				goBack: navigateBack,
				noBottomTabs: true,
			}),
		[],
	);

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="Default" component={ManagedCollectionScreen} />
			<Stack.Screen name="NFT" component={ManagedCollectibleScreen} />
		</Stack.Navigator>
	);
};

export default CollectionStack;
